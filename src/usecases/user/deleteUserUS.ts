import UserNotFoundExistError from "Errors/user/userNotFoundError";
import ValidationError from "Errors/validationError";
import { UserRepo } from "Repositories/user/userRepo";
import { UserIdValidator } from "Usecases/user/validator/userIdValidator";

export interface DeleteUserUS {
  execute(userId: string, reqId: string): Promise<boolean>;
}

export class DeleteUserUSImpl implements DeleteUserUS {
  constructor(
    private readonly userIdValidator: UserIdValidator,
    private readonly userRepo: UserRepo,
  ) {}

  public async execute(userId: string, reqId: string): Promise<boolean> {
    const validationErrors = this.userIdValidator.checkValid(userId);
    if (validationErrors.length > 0) {
      throw new ValidationError("Invalid UserId.", validationErrors);
    }

    const user = this.userRepo.getActiveUserById(userId, reqId);
    if (!user){
      throw new UserNotFoundExistError();
    }

    return await this.userRepo.deleteUser(userId, reqId);
  }
}
