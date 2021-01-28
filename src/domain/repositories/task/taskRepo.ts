import { TaskFileGateway } from "Gateways/task/taskFileGateway";
import { TaskPgGateway } from "Gateways/task/taskPgGateway";
import AttachmentModelReq from "Models/task/attachmentModelReq";
import FileModelReq from "Models/task/FileModelReq";
import FileModelRes from "Models/task/FileModelRes";
import NewTaskModelReq from "Models/task/newTaskModelReq";
import NewTagModelReq from "Models/task/newTagModelReq";
import TaskModelRes from "Models/task/taskModelRes";
import TasksListModelRes from "Models/task/tasksListModelRes";

export interface TaskRepo {
  createTask(newTaskReq: NewTaskModelReq, reqId: string): Promise<string>;
  getTasksByUserId(userId: string, reqId: string): Promise<TasksListModelRes[]>;
  getDetailTask(taskId: string, reqId: string): Promise<TaskModelRes | null>;
  getTagByName(tagName: string, reqId: string): Promise<string | null>;
  linkTagWithTaskById(tagId: string, taskId: string, reqId: string): Promise<boolean>;
  saveFiles(filesModelReq: FileModelReq[], reqId: string): Promise<FileModelRes[]>;
  addAttachments(attachmentsModelReq: AttachmentModelReq[], taskId: string, reqId: string): Promise<void>;
  createTagByName(newTagReq: NewTagModelReq, reqId: string): Promise<string>;
  deleteAttachment(attachmentsId: string, reqId: string): Promise<boolean>;
  doesUserOwnTask(userId: string, taskId: string,attachmentId: string, reqId: string): Promise<boolean>;
}

export class TaskRepoImpl implements TaskRepo {
  constructor(private readonly taskPgGateway: TaskPgGateway, private readonly taskFileGateway: TaskFileGateway) {}
  public async createTask(newTaskReq: NewTaskModelReq, reqId: string): Promise<string> {
    return await this.taskPgGateway.createTask(newTaskReq, reqId);
  }
  public async getTasksByUserId(userId: string, reqId: string): Promise<TasksListModelRes[]> {
    return await this.taskPgGateway.getTasksByUserId(userId, reqId);
  }

  public async getDetailTask(taskId: string, reqId: string): Promise<TaskModelRes | null> {
    return await this.taskPgGateway.getDetailTask(taskId, reqId);
  }

  public async saveFiles(filesModelReq: FileModelReq[], reqId: string): Promise<FileModelRes[]> {
    return await this.taskFileGateway.saveFiles(filesModelReq, reqId);
  }

  public async addAttachments(attachmentsModelReq: AttachmentModelReq[], taskId: string, reqId: string): Promise<void> {
    await this.taskPgGateway.addAttachments(attachmentsModelReq, taskId, reqId);
  }
  public async createTagByName(newTaskReq: NewTaskModelReq, reqId: string): Promise<string> {
    return await this.taskPgGateway.createTagByName(newTaskReq, reqId);
  }
  public async getTagByName(tagName: string, reqId: string): Promise<string | null> {
    return await this.taskPgGateway.getTagByName(tagName, reqId);
  }
  public async linkTagWithTaskById(tagId: string, taskId: string, reqId: string): Promise<boolean> {
    return await this.taskPgGateway.linkTagWithTaskById(tagId, taskId, reqId);
  }
  public async deleteAttachment(attachmentsId: string, reqId: string): Promise<boolean> {
    return await this.taskPgGateway.deleteAttachment(attachmentsId, reqId);
  }
  public async doesUserOwnTask(userId: string, taskId: string,attachmentId: string, reqId: string): Promise<boolean> {
    return await this.taskPgGateway.doesUserOwnTask(userId, taskId,attachmentId, reqId);
  }
}
