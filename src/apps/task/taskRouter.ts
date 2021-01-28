import { Router } from "Common/router";
import koaBody from "koa-body";
import KoaRouter, { IMiddleware } from "koa-router";
import { AddAttachmentsUS } from "Usecases/task/addAttachmentsUS";
import { CreateTaskUS } from "Usecases/task/createTaskUS";
import { DeleteAttachmentUS } from "Usecases/task/deleteUserUS";
import { GetTaskUS } from "Usecases/task/getTaskUS";
import { GetUserTasksUS } from "Usecases/task/getUserTasksUS";
import { PageTokenUtils } from "Utils/pageTokenUtils";
import { UserRoleUtils } from "Utils/userRoleUtils";
import AttachmentViewReq from "ViewModels/task/attachmentViewReq";
import NewTaskViewReq from "ViewModels/task/newTaskViewReq";

export class TaskRouter extends Router {
  private readonly router: KoaRouter;

  constructor(
    private readonly createTaskUS: CreateTaskUS,
    private readonly getUserTasksUS: GetUserTasksUS,
    private readonly getTaskUS: GetTaskUS,
    private readonly addAttachmentsUS: AddAttachmentsUS,
    private readonly deleteAttachmentsUS: DeleteAttachmentUS,
    pageTokenUtils: PageTokenUtils,
    userRoleUtils: UserRoleUtils,
  ) {
    super(pageTokenUtils, userRoleUtils);
    this.router = new KoaRouter({
      prefix: "/tasks",
    });
    this.router.post(
      "CreateTask",
      "/",
      this.handleProtectedRoute(async (ctx) => {
        const reqId = Router.getRequestId(ctx);
        const createBy = Router.getUserClaims(ctx).userId;
        const { taskName, description, dueTime, tags, attachments } = ctx.request.body;
        const newTaskReq: NewTaskViewReq = {
          taskName,
          description,
          dueTime,
          createBy,
          tags,
          attachments,
        };
        const taskRes = await this.createTaskUS.execute(newTaskReq, reqId);
        ctx.body = Router.buildSuccessBody(taskRes);
        ctx.status = 201;
      }),
    );
    this.router.get(
      "GetUserTasks",
      "/",
      this.handleProtectedRoute(async (ctx) => {
        const reqId = Router.getRequestId(ctx);
        const userId = Router.getUserClaims(ctx).userId;

        const tasksRes = await this.getUserTasksUS.execute(userId, reqId);

        ctx.body = Router.buildSuccessBody(tasksRes);
        ctx.status = 200;
      }),
    );

    this.router.get(
      "GetDetailTask",
      "/:taskId",
      this.handlePublicRoute(async (ctx) => {
        const reqId = Router.getRequestId(ctx);
        const taskId = ctx.params.taskId;

        const taskRes = await this.getTaskUS.execute(taskId, reqId);

        ctx.body = Router.buildSuccessBody(taskRes);
        ctx.status = 200;
      }),
    );
    this.router.delete(
      "removeAttachmentFromTask",
      "/:taskId/attachments/:attachmentId",
      this.handleProtectedRoute(async (ctx) => {
        const reqId = Router.getRequestId(ctx);
        const userId = Router.getUserClaims(ctx).userId;
        const taskId = ctx.params.taskId;
        const attachmentId = ctx.params.attachmentId;
        const isRemoved = await this.deleteAttachmentsUS.execute(userId, taskId, attachmentId, reqId);
        ctx.status = isRemoved ? 204 : 400;
      }),
    );
    this.router.post(
      "addAttachment",
      "/:taskId/attachments",
      koaBody({ multipart: true }),
      this.handleProtectedRoute(async (ctx) => {
        const reqId = Router.getRequestId(ctx);
        const taskId = ctx.params.taskId;
        const files = ctx.request.files;
        if (files !== undefined && Object.keys(files).length !== 0) {
          const attachmentsViewReq: AttachmentViewReq[] = [];
          for (const attachment in files) {
            if (files.hasOwnProperty(attachment)) {
              attachmentsViewReq.push({
                attachmentName: attachment,
                file: files[attachment],
              });
            }
          }
          const taskRes = await this.addAttachmentsUS.execute(attachmentsViewReq, taskId, reqId);
          ctx.body = Router.buildSuccessBody(taskRes);
          ctx.status = 201;
        } else {
          ctx.status = 400;
        }
      }),
    );
  }

  public routes(): IMiddleware {
    return this.router.routes();
  }
}
