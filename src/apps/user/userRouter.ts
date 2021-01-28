import { Router } from "Common/router";
import KoaRouter, { IMiddleware } from "koa-router";
import { CreateUserUS } from "Usecases/user/createUserUS";
import { DeleteUserUS } from "Usecases/user/deleteUserUS";
import { GetActiveUserUS } from "Usecases/user/getActiveUserUS";
import { LoginUserUS } from "Usecases/user/loginUserUS";
import { UpdateUserUS } from "Usecases/user/updateUserUS";
import { PageTokenUtils } from "Utils/pageTokenUtils";
import { UserRoleUtils } from "Utils/userRoleUtils";
import LoginUserViewReq from "ViewModels/user/loginUserViewReq";
import NewUserViewReq from "ViewModels/user/newUserViewReq";
import UpdateUserViewReq from "ViewModels/user/updateUserViewReq";
export class UserRouter extends Router {
  private readonly router: KoaRouter;

  constructor(
    private readonly loginUserUS: LoginUserUS,
    private readonly createUserUS: CreateUserUS,
    private readonly getActiveUserUS: GetActiveUserUS,
    private readonly updateUserUS: UpdateUserUS,
    private readonly deleteUserUS: DeleteUserUS,
    pageTokenUtils: PageTokenUtils,
    userRoleUtils: UserRoleUtils,
  ) {
    super(pageTokenUtils, userRoleUtils);
    this.router = new KoaRouter({
      prefix: "/users",
    });
    this.router.post(
      "CreateUser",
      "/",
      this.handlePublicRoute(async (ctx) => {
        const reqId = Router.getRequestId(ctx);

        const { firstName, lastName, email, password } = ctx.request.body;
        const newUserReq: NewUserViewReq = {
          firstName,
          lastName,
          email,
          password,
        };
        const userRes = await this.createUserUS.execute(newUserReq, reqId);

        ctx.body = Router.buildSuccessBody(userRes);
        ctx.status = 201;
      }),
    );

    this.router.get(
      "GetMe",
      "/me",
      this.handleProtectedRoute(async (ctx) => {
        const reqId = Router.getRequestId(ctx);
        const userId = Router.getUserClaims(ctx).userId;

        const userRes = await this.getActiveUserUS.execute({ userId }, reqId);

        ctx.body = Router.buildSuccessBody(userRes);
        ctx.status = 200;
      }),
    );

    this.router.get(
      "GetUserById",
      "/:id",
      this.handlePublicRoute(async (ctx) => {
        const reqId = Router.getRequestId(ctx);
        const userId = ctx.params.id;

        const userRes = await this.getActiveUserUS.execute({ userId }, reqId);

        ctx.body = Router.buildSuccessBody(userRes);
        ctx.status = 200;
      }),
    );

    this.router.put(
      "UpdateUser",
      "/:userId",
      this.handlePublicRoute(async (ctx) => {
        const reqId = Router.getRequestId(ctx);
        const userId = ctx.params.userId;
        const { firstName, lastName, password } = ctx.request.body;
        const updateUserReq: UpdateUserViewReq = {
          userId,
          firstName,
          lastName,
          password,
        };

        const userRes = await this.updateUserUS.execute(updateUserReq, reqId);

        ctx.body = Router.buildSuccessBody(userRes);
        ctx.status = 200;
      }),
    );
    this.router.post(
      "LogIn",
      "/login",
      this.handlePublicRoute(async (ctx) => {
        const reqId = Router.getRequestId(ctx);
        const { email, password } = ctx.request.body;
        const loginUserReq: LoginUserViewReq = { email, password };
        const loginRes = await this.loginUserUS.execute(loginUserReq, reqId);

        ctx.body = Router.buildSuccessBody(loginRes);
        ctx.status = 200;
      }),
    );

    this.router.delete(
      "DeleteUser",
      "/",
      this.handleProtectedRoute(async (ctx) => {
        const reqId = Router.getRequestId(ctx);
        const userId = Router.getUserClaims(ctx).userId;

        const isDeleted = await this.deleteUserUS.execute(userId, reqId);

        if (isDeleted) {
          ctx.status = 204;
        } else {
          ctx.status = 404;
        }
      }),
    );
  }

  public routes(): IMiddleware {
    return this.router.routes();
  }
}
