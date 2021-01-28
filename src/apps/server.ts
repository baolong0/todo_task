/* tslint:disable:import-name */
import LogTag from "Common/logTag";
import appIdMiddleware from "Common/middlewares/appIdMiddleware";
import authorizeMiddleware from "Common/middlewares/authorizeMiddleware";
import errorHandlerMiddleware from "Common/middlewares/errorHandlerMiddleware";
import internalApiKeyMiddleware from "Common/middlewares/internalApiKeyMiddleware";
import requestIdMiddleware from "Common/middlewares/requestIdMiddleware";
import { Router } from "Common/router";
import { SecurityConfig, ServerConfig } from "Configs/appConfig";
import NotFoundError from "Errors/http/notFoundError";
import http from "http";
import Container from "Injection/container";
import { TYPES } from "Injection/types";
import Koa, { Context } from "koa";
import bodyParser from "koa-bodyparser";
import responseTime from "koa-response-time";
import KoaRouter from "koa-router";
import { GetActiveUserUS } from "Usecases/user/getActiveUserUS";
import { Logger } from "Utils/logger";
import cors from "@koa/cors";

export class Server {
  private readonly app: Koa;
  private readonly logger: Logger;
  private readonly serverConfig: ServerConfig;

  constructor(appContainer: Container) {
    this.logger = appContainer.getNotNull<Logger>(TYPES.Logger);
    this.serverConfig = appContainer.getNotNull<ServerConfig>(TYPES.ServerConfig);
    const securityConfig = appContainer.getNotNull<SecurityConfig>(TYPES.SecurityConfig);
    const getActiveUserUS = appContainer.getNotNull<GetActiveUserUS>(TYPES.GetActiveUserUS);

    // Router initialize
    const userRouter = appContainer.getNotNull<Router>(TYPES.UserRouter);
    const taskRouter = appContainer.getNotNull<Router>(TYPES.TaskRouter);
    const fileRouter = appContainer.getNotNull<Router>(TYPES.FileRouter);

    this.app = new Koa();
    this.app.use(responseTime());
    this.app.use(requestIdMiddleware());
    this.app.use(cors());
    this.app.use(bodyParser());
    this.app.use(errorHandlerMiddleware(this.logger));
    this.app.use(authorizeMiddleware(getActiveUserUS, this.logger));
    this.app.use(internalApiKeyMiddleware(securityConfig.internalApiKey));
    this.app.use(appIdMiddleware());

    this.app.use(userRouter.routes());
    this.app.use(taskRouter.routes());
    this.app.use(fileRouter.routes());

    // Wildcard router, handle 404
    const wildcardRouter = new KoaRouter();
    wildcardRouter.all("/(.*)", async (ctx: Context) => {
      const req = ctx.request;
      this.logger.traceW(LogTag.NOT_FOUND_TRAFFIC, `Access ${req.method} ${req.url}`, {
        url: req.originalUrl,
        method: req.method,
        headers: req.headers,
        body: req.body,
      });
      // TODO this will log again in errorHandlerMiddleware. Hanle this duplication
      throw new NotFoundError();
    });
    this.app.use(wildcardRouter.routes());
  }

  public start(): http.Server {
    return this.app.listen(this.serverConfig.port, () => {
      // TODO alert by email/notification here
      this.logger.traceI(LogTag.SERVER_INITIALIZATION, `The server is starting at port ${this.serverConfig.port}`);
    });
  }
}
