import InCorrectPassWord from "Errors/user/IncorrectPasswordError";
import UserNotFoundExistError from "Errors/user/userNotFoundError";
import ValidationError from "Errors/validationError";
import LoginUserModelReq from "Models/user/loginUserModelReq";
import { UserRepo } from "Repositories/user/userRepo";
import { LoginUserValidator } from "Usecases/user/validator/loginUserValidator";
import { Logger } from "Utils/logger";
import LoginUserViewReq from "ViewModels/user/loginUserViewReq";
import UserViewRes from "ViewModels/user/userViewRes";

export interface LoginUserUS {
  execute(loginUserReq: LoginUserViewReq, reqId: string): Promise<UserViewRes>;
}
export class LoginUserImpl implements LoginUserUS {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly loginUserValidator: LoginUserValidator,
    private readonly logger: Logger,
  ) {}

  public async execute(loginUserViewReq: LoginUserViewReq, reqId: string): Promise<UserViewRes> {
    const validationErrors = this.loginUserValidator.checkValid(loginUserViewReq);
    if (validationErrors.length > 0) {
      throw new ValidationError("Invalid login user account request.", validationErrors);
    }
    const loginUserModelReq = new LoginUserModelReq(loginUserViewReq.email, loginUserViewReq.password);
    const userModelRes = await this.userRepo.loginUser(loginUserModelReq, reqId);
    if (!userModelRes) {
      throw new UserNotFoundExistError("User NOT FOUND !!");
    }
    if (loginUserViewReq.password !== userModelRes?.password) {
      throw new InCorrectPassWord();
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
