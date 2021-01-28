import BaseError from "Errors/baseError";
import UserNotFoundExistError from "Errors/user/userNotFoundError";
import ValidationError from "Errors/validationError";
import { TaskRepo } from "Repositories/task/taskRepo";
import { UserRepo } from "Repositories/user/userRepo";
import { DeleteAttachmentValidatorImpl } from "./validator/deleteAttachmentValidator";

export interface DeleteAttachmentUS {
  execute(userId: string, taskId: string, attachmentId: string, reqId: string): Promise<boolean>;
}

export class DeleteAttachmentUSImpl implements DeleteAttachmentUS {
  constructor(
    private readonly deleteAttachmentValidator: DeleteAttachmentValidatorImpl,
    private readonly userRepo: UserRepo,
    private readonly taskRepo: TaskRepo,
  ) {}

  public async execute(userId: string, taskId: string, attachmentId: string, reqId: string): Promise<boolean> {
    const validationErrors = this.deleteAttachmentValidator.checkValid(userId, taskId, attachmentId);
    if (validationErrors.length > 0) {
      throw new ValidationError("Invalid Request.", validationErrors);
    }

    const user = this.userRepo.getActiveUserById(userId, reqId);
    if (!user) {
      throw new UserNotFoundExistError();
    }
    const isUserOwnTask = await this.taskRepo.doesUserOwnTask(userId, taskId,attachmentId,reqId);
    if(!isUserOwnTask){
      throw new BaseError("You don't own this attachment, you can't remove it");
    }
    return await this.taskRepo.deleteAttachment(attachmentId, reqId);
  }
}
