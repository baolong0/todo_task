import ActivityModelRes from "Models/task/activityModelRes";
import AttachmentModelReq from "Models/task/attachmentModelReq";
import AttachmentModelRes from "Models/task/attachmentModelRes";
import NewTagModelReq from "Models/task/newTagModelReq";
import NewTaskModelReq from "Models/task/newTaskModelReq";
import TagModelRes from "Models/task/tagModelRes";
import TaskModelRes from "Models/task/taskModelRes";
import TasksListModelRes from "Models/task/tasksListModelRes";
import * as sql from "Sql/task";
import { Logger } from "Utils/logger";
import { DbClient, PgClientProvider } from "Utils/pgClientProvider";

export interface TaskPgGateway {
  createTask(newTaskReq: NewTaskModelReq, reqId: string): Promise<string>;
  getTasksByUserId(userId: string, reqId: string): Promise<TasksListModelRes[]>;
  getDetailTask(taskId: string, userId: string, reqId: string): Promise<TaskModelRes | null>;
  createTagByName(newTagReq: NewTagModelReq, reqId: string): Promise<string>;
  getTagByName(tagId: string, reqId: string): Promise<string | null>;
  linkTagWithTaskById(tagId: string, taskId: string, reqId: string): Promise<boolean>;
  getDetailTask(taskId: string, reqId: string): Promise<TaskModelRes | null>;
  addAttachments(attachmentsModelReq: AttachmentModelReq[], taskId: string, reqId: string): Promise<void>;
  deleteAttachment(attachmentId: string, reqId: string): Promise<boolean>;
  doesUserOwnTask(userId: string, taskId: string, attachmentId: string, reqId: string): Promise<boolean>;
}

export class TaskPgGatewayImpl implements TaskPgGateway {
  private readonly dbClient: DbClient;

  constructor(pgClientProvider: PgClientProvider, private readonly logger: Logger) {
    this.dbClient = pgClientProvider.db();
  }
  public async createTask(newTaskReq: NewTaskModelReq, reqId: string): Promise<string> {
    try {
      const resuls = await this.dbClient.one(sql.create_task_non_ref, {
        task_name: newTaskReq.name,
        description: newTaskReq.description,
        due_time: newTaskReq.dueTime,
        status: newTaskReq.status,
        created_by: newTaskReq.createBy,
      });
      return resuls.id;
    } catch (error) {
      throw error;
    }
  }
  public async getTagByName(tagName: string, reqId: string): Promise<string | null> {
    try {
      const resuls = await this.dbClient.oneOrNone(sql.get_tag_by_name, {
        name: tagName,
      });
      return resuls !== null ? resuls.id : null;
    } catch (error) {
      throw error;
    }
  }
  public async linkTagWithTaskById(tagId: string, taskId: string, reqId: string): Promise<boolean> {
    try {
      const link = await this.dbClient.one(sql.link_task_with_tag_by_id, {
        task_id: taskId,
        tag_id: tagId,
      });
      return link !== null ? true : false;
    } catch (error) {
      throw error;
    }
  }
  public async createTagByName(newTagReq: NewTagModelReq, reqId: string): Promise<string> {
    try {
      const results = await this.dbClient.one(sql.create_tag_by_name, {
        name: newTagReq.name,
        created_by: newTagReq.createBy,
      });
      return results.id;
    } catch (error) {
      throw error;
    }
  }
  public async getTasksByUserId(userId: string, reqId: string): Promise<TasksListModelRes[]> {
    try {
      const tasks = await this.dbClient.manyOrNone(sql.get_tasks_by_user_id, {
        userId,
      });

      const tasksModelRes: TasksListModelRes[] = [];
      for (const task of tasks) {
        const taskId = task.id;
        const tagsList = await this.dbClient.manyOrNone<TagModelRes>(sql.get_tags_by_task_id, { taskId });
        tasksModelRes.push({
          tagsList,
          id: task.id,
          name: task.name,
          dueTime: task.duetime,
          status: task.status,
        });
      }

      return tasksModelRes;
    } catch (error) {
      this.logger.traceE(reqId, "Error: Cannot get task!", { req: userId }, error);
      throw error;
    }
  }

  public async getDetailTask(taskId: string, reqId: string): Promise<TaskModelRes | null> {
    try {
      const task = await this.dbClient.oneOrNone(sql.get_detail_task, {
        taskId,
      });
      if (!task) {
        return null;
      }

      const tagsList = await this.dbClient.manyOrNone<TagModelRes>(sql.get_tags_by_task_id, { taskId });
      const attachmentsList = await this.dbClient.manyOrNone<AttachmentModelRes>(sql.get_attachments_by_task_id, {
        taskId,
      });
      const activitiesList = await this.dbClient.manyOrNone<ActivityModelRes>(sql.get_activities_by_task_id, {
        taskId,
      });

      const taskModelRes = {
        tagsList,
        activitiesList,
        attachmentsList,
        id: task.id,
        name: task.name,
        description: task.description,
        dueTime: task.duetime,
        status: task.status,
      };
      return taskModelRes;
    } catch (error) {
      this.logger.traceE(reqId, "Get Detail Task Error!", { req: taskId }, error);
      throw error;
    }
  }

  public async addAttachments(attachmentsModelReq: AttachmentModelReq[], taskId: string, reqId: string): Promise<void> {
    try {
      for (const attachmentModelReq of attachmentsModelReq) {
        await this.dbClient.none(sql.add_attachment, {
          taskId,
          name: attachmentModelReq.attachmentName,
          path: attachmentModelReq.path,
        });
      }
    } catch (error) {
      this.logger.traceE(reqId, "Error: Cannot add attachments!", { attachmentsModelReq }, error);
      throw error;
    }
  }
  public async deleteAttachment(attachmentId: string, reqId: string): Promise<boolean> {
    try {
      const results = await this.dbClient.one(sql.delete_attachment, { attachment_id: attachmentId });
      return results;
    } catch (error) {
      this.logger.traceE(reqId, "Error: Cannot remove attachments!", { attachmentId }, error);
      throw error;
    }
  }
  public async doesUserOwnTask(userId: string, taskId: string, attachmentId: string, reqId: string): Promise<boolean> {
    try {
      const results = await this.dbClient.oneOrNone(sql.check_user_owns_the_task, {
        attachment_id: attachmentId,
        user_id: userId,
        task_id: taskId,
      });
      return results !== null;
    } catch (error) {
      this.logger.traceE(reqId, "Error: Cannot check user owns the task or not", userId, error);
      throw error;
    }
  }
}
