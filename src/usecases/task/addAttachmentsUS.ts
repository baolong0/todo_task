import { TaskRepo } from "Repositories/task/taskRepo";
import AttachmentViewReq from "ViewModels/task/attachmentViewReq";
import FileModelReq from "Models/task/FileModelReq";
import AttachmentModelReq from "Models/task/attachmentModelReq";
import TaskViewRes from "ViewModels/task/taskViewRes";

export interface AddAttachmentsUS {
  execute(attachmentsViewReq: AttachmentViewReq[], taskId: string, reqId: string): Promise<TaskViewRes>;
}

export class AddAttachmentsUSImpl implements AddAttachmentsUS {
  constructor(private readonly taskRepo: TaskRepo) {}

  public async execute(attachmentsViewReq: AttachmentViewReq[], taskId: string, reqId: string): Promise<TaskViewRes> {
    const task = await this.taskRepo.getDetailTask(taskId, reqId);
    if (!task) {
      throw new Error("Error 404: Task Not Found!");
    }

    const filesModelReq: FileModelReq[] = [];
    for (const attachment of attachmentsViewReq) {
      filesModelReq.push({
        attachmentName: attachment.attachmentName,
        file: attachment.file,
      });
    }
    const filesViewRes = await this.taskRepo.saveFiles(filesModelReq, reqId);

    const attachmentsModelReq: AttachmentModelReq[] = [];
    for (const fileViewRes of filesViewRes) {
      attachmentsModelReq.push({
        attachmentName: fileViewRes.attachmentName,
        path: fileViewRes.path,
      });
    }
    await this.taskRepo.addAttachments(attachmentsModelReq, taskId, reqId);

    const updatedTask = await this.taskRepo.getDetailTask(taskId, reqId);
    if (!updatedTask) {
      throw new Error("Added attachments to task successfully but cannot get that task by id");
    }
    return updatedTask;
  }
}
