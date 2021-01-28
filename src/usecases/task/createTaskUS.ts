import TaskStatus from "Common/taskStatus";
import { error } from "console";
import InternalServerError from "Errors/http/internalServerError";
import UserNotFoundExistError from "Errors/user/userNotFoundError";
import ValidationError from "Errors/validationError";
import AttachmentModelReq from "Models/task/attachmentModelReq";
import NewTagModelReq from "Models/task/newTagModelReq";
import NewTaskModelReq from "Models/task/newTaskModelReq";
import { TaskRepo } from "Repositories/task/taskRepo";
import { UserRepo } from "Repositories/user/userRepo";
import { NewTaskValidator } from "Usecases/task/validator/newTaskValidator";
import { Logger } from "Utils/logger";
import NewTaskViewReq from "ViewModels/task/newTaskViewReq";
import TaskNonRefViewRes from "ViewModels/task/taskNonRefViewRes";
import TaskViewRes from "ViewModels/task/taskViewRes";
export interface CreateTaskUS {
  execute(newTaskViewReq: NewTaskViewReq, reqId: string): Promise<TaskNonRefViewRes | TaskViewRes>;
}

export class CreateTaskUSImpl implements CreateTaskUS {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly taskRepo: TaskRepo,
    private readonly newTaskValidator: NewTaskValidator,
    private readonly logger: Logger,
  ) {}

  public async execute(newTaskViewReq: NewTaskViewReq, reqId: string): Promise<TaskNonRefViewRes | TaskViewRes> {
    const validationErrors = this.newTaskValidator.checkValid(newTaskViewReq);
    if (validationErrors.length > 0) {
      throw new ValidationError("Invalid creating todo task request.", validationErrors);
    }
    const isDeleted = false;
    const newTaskModelReq = new NewTaskModelReq(
      newTaskViewReq.taskName,
      newTaskViewReq.description,
      newTaskViewReq.dueTime,
      newTaskViewReq.tags,
      newTaskViewReq.attachments,
      newTaskViewReq.createBy,
      TaskStatus.UNDONE,
      isDeleted,
    );
    const isUserIdActive = await this.userRepo.getActiveUserById(newTaskModelReq.createBy, reqId);
    if (!isUserIdActive) {
      throw new UserNotFoundExistError("User ID " + newTaskModelReq.createBy + " Was Deleted or Unregistered");
    }
    const userId = newTaskModelReq.createBy;

    const taskId = await this.taskRepo.createTask(newTaskModelReq, reqId);
    if (newTaskModelReq.tags !== undefined && newTaskModelReq.tags.length > 0) {
      // tag not null
      await this.linkTagListToTask(newTaskModelReq.tags, userId, taskId, reqId);
    }
    if (newTaskModelReq.attachments !== undefined && newTaskModelReq.attachments.length > 0) {
      // attachments not null
      await this.linkAttachemntListToTask(newTaskModelReq.attachments, taskId, reqId);
    }
    const newTaskModelRes = await this.taskRepo.getDetailTask(taskId, reqId);
    if (!newTaskModelRes) {
      throw new InternalServerError("oooop, nothing to return !");
    }
    return {
      id: newTaskModelRes.id,
      name: newTaskModelRes.name,
      description: newTaskModelRes.description,
      dueTime: newTaskModelRes.dueTime,
      status: newTaskModelRes.status,
      createBy: newTaskModelReq.createBy,
      tagsList: newTaskModelRes.tagsList,
      attachmentsList: newTaskModelRes.attachmentsList,
    };
  }
  private async linkTagListToTask(tagList: string[], userId: string, taskId: string, reqId: string) {
    tagList.forEach(async (element) => {
      const isTagExit = await this.taskRepo.getTagByName(element, reqId);
      let tagId: string;
      if (isTagExit) {
        tagId = isTagExit;
      } else {
        const newTagModelReq = new NewTagModelReq(element, userId, false);
        tagId = await this.taskRepo.createTagByName(newTagModelReq, reqId);
      }
      const isLink = await this.taskRepo.linkTagWithTaskById(tagId, taskId, reqId);
      if (!isLink) {
        // can't link
        throw new InternalServerError("Can't attach tags while creating the task. TASK was successful creation ! ");
      }
    });
  }
  private async linkAttachemntListToTask(atachemntList: any[], taskId: string, reqId: string) {
    const attachmentsModelReq: AttachmentModelReq[] = [];
    for (const attachments of atachemntList) {
      attachmentsModelReq.push({
        attachmentName: attachments.name,
        path: attachments.path,
      });
    }
    await this.taskRepo.addAttachments(attachmentsModelReq, taskId, reqId);
  }
}
