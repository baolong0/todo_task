import InternalServerError from "Errors/http/internalServerError";
import UserNotFoundExistError from "Errors/user/userNotFoundError";
import ValidationError from "Errors/validationError";
import UpdateUserModelReq from "Models/user/updateUserModelReq";
import { UserRepo } from "Repositories/user/userRepo";
import { UpdateUserValidator } from "Usecases/user/validator/updateUserValidator";
import { Logger } from "Utils/logger";
import UpdateUserViewReq from "ViewModels/user/updateUserViewReq";
import UpdateUserViewRes from "ViewModels/user/updateUserViewRes";

export interface UpdateUserUS {
  execute(updateUserViewReq: UpdateUserViewReq, reqId: string): Promise<UpdateUserViewRes>;
}

export class UpdateUserUSImpl implements UpdateUserUS {
  constructor(
    private readonly updateUserValidator: UpdateUserValidator,
    private readonly userRepo: UserRepo,
    private readonly logger: Logger,
  ) {}

  public async execute(updateUserViewReq: UpdateUserViewReq, reqId: string): Promise<UpdateUserViewRes> {
    const validationErrors = this.updateUserValidator.checkValid(updateUserViewReq);
    if (validationErrors.length > 0) {
      throw new ValidationError("Invalid update user account request.", validationErrors);
    }

    const userId = updateUserViewReq.userId;
    let userModel = await this.userRepo.getActiveUserById(userId, reqId);
    if (userModel === null) {
      throw new UserNotFoundExistError();
    }

    const updateUserModelReq = new UpdateUserModelReq(
      updateUserViewReq.userId,
      updateUserViewReq.firstName,
      updateUserViewReq.lastName,
      updateUserViewReq.password,
    );

    const updateStatus = await this.userRepo.updateUser(updateUserModelReq, reqId);
    if (!updateStatus) {
      this.logger.traceE(reqId, "Cannot Update User", {
        userId,
      });
      throw new InternalServerError("InternalServerError: Cannot Update User");
    }

    userModel = await this.userRepo.getActiveUserById(userId, reqId);
    if (userModel === null) {
      this.logger.traceE(reqId, "Updated user successfully but cannot get that user by id", {
        userId,
      });
      throw new InternalServerError("Updated user successfully but cannot get new created user.");
    }

    return {
      userId: userModel.id,
      email: userModel.email,
      firstName: userModel.firstName,
      lastName: userModel.lastName,
      updatedAt: userModel.updatedAt,
    };
  }
}
