import UserNotFoundExistError from "Errors/user/userNotFoundError";
import ValidationError from "Errors/validationError";
import { UserRepo } from "Repositories/user/userRepo";
import { GetUserValidator } from "Usecases/user/validator/getUserValidator";
import GetUserViewReq from "ViewModels/user/getUserViewReq";
import UserViewRes from "ViewModels/user/userViewRes";

export interface GetActiveUserUS {
  execute(getUserReq: GetUserViewReq, reqId: string): Promise<UserViewRes>;
}

export class GetActiveUserUSImpl implements GetActiveUserUS {
  constructor(private readonly userRepo: UserRepo, private readonly getUserValidator: GetUserValidator) {}

  public async execute(getUserReq: GetUserViewReq, reqId: string): Promise<UserViewRes> {
    const validationErrors = this.getUserValidator.checkValid(getUserReq);
    if (validationErrors.length > 0) {
      throw new ValidationError("Invalid getting user request", validationErrors);
    }

    const userModelRes = await this.userRepo.getActiveUserById(getUserReq.userId, reqId);

    if (userModelRes === null) {
      throw new UserNotFoundExistError();
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
