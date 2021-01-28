import { Router } from "Common/router";
import koaBody from "koa-body";
import KoaRouter, { IMiddleware } from "koa-router";
import { UploadFileUS } from "Usecases/file/uploadFileUs";
import { PageTokenUtils } from "Utils/pageTokenUtils";
import { UserRoleUtils } from "Utils/userRoleUtils";
import FileViewReq from "ViewModels/file/fileViewReq";

export class FileRouter extends Router {
  private readonly router: KoaRouter;

  constructor(
    private readonly uploadFileUS: UploadFileUS,
    pageTokenUtils: PageTokenUtils,
    userRoleUtils: UserRoleUtils,
  ) {
    super(pageTokenUtils, userRoleUtils);
    this.router = new KoaRouter({
      prefix: "/files",
    });
    this.router.post(
      "uploadFile",
      "/upload",
      koaBody({ multipart: true }),
      this.handleProtectedRoute(async (ctx) => {
        const reqId = Router.getRequestId(ctx);
        const files = ctx.request.files;
        if (files !== undefined && Object.keys(files).length !== 0) {
          for (const attachment in files) {
            if (files.hasOwnProperty(attachment)) {
              const uploadFileViewReq: FileViewReq = {
                file: files[attachment],
              };
              const fileRes = await this.uploadFileUS.execute(uploadFileViewReq, reqId);
              ctx.body = Router.buildSuccessBody(fileRes);
              ctx.status = 201;
            }
          }
          // const uploadFileViewReq: FileViewReq = { file };
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
