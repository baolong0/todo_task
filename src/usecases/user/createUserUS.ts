import UserRole from "Common/userRole";
import InternalServerError from "Errors/http/internalServerError";
import ValidationError from "Errors/validationError";
import NewUserModelReq from "Models/user/newUserModelReq";
import { UserRepo } from "Repositories/user/userRepo";
import { NewUserValidator } from "Usecases/user/validator/newUserValidator";
import { Logger } from "Utils/logger";
import NewUserViewReq from "ViewModels/user/newUserViewReq";
import UserViewRes from "ViewModels/user/userViewRes";

export interface CreateUserUS {
  execute(newUserViewReq: NewUserViewReq, reqId: string): Promise<UserViewRes>;
}

export class CreateUserUSImpl implements CreateUserUS {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly newUserValidator: NewUserValidator,
    private readonly logger: Logger,
  ) {}

  public async execute(newUserViewReq: NewUserViewReq, reqId: string): Promise<UserViewRes> {
    const validationErrors = this.newUserValidator.checkValid(newUserViewReq);
    if (validationErrors.length > 0) {
      throw new ValidationError("Invalid creating user account request.", validationErrors);
    }

    const isDeleted = false;
    const newUserModelReq = new NewUserModelReq(
      newUserViewReq.email,
      newUserViewReq.password,
      UserRole.USER,
      newUserViewReq.firstName,
      newUserViewReq.lastName,
      isDeleted,
    );
    const userId = await this.userRepo.createUser(newUserModelReq, reqId);
    const userModelRes = await this.userRepo.getActiveUserById(userId, reqId);

    if (userModelRes === null) {
      this.logger.traceE(reqId, "Created user successfully but cannot get that user by id", {
        userId,
      });
      throw new InternalServerError("Created user successfully but cannot get new created user.");
    }

    return {
      id: userModelRes.id,
      firstName: userModelRes.firstName,
      lastName: userModelRes.lastName,
      email: userModelRes.email,
      role: userModelRes.role,
      createdAt: userModelRes.createdAt,
      updatedAt: userModelRes.updatedAt,
    };
  }
}
