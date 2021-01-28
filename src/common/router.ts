import Pagination from "Common/pagination";
import UserClaims from "Common/userClaims";
import UserRole from "Common/userRole";
import NotFoundError from "Errors/http/notFoundError";
import UnauthorizedError from "Errors/http/unauthorizedError";
import { Context } from "koa";
import { IMiddleware } from "koa-router";
import { PageTokenUtils } from "Utils/pageTokenUtils";
import { UserRoleUtils } from "Utils/userRoleUtils";

export abstract class Router {
  constructor(protected readonly pageTokenUtils: PageTokenUtils, protected readonly userRoleUtils: UserRoleUtils) {}

  public abstract routes(): IMiddleware;

  protected static buildSuccessBody<T>(data: T): SuccessResponse<T> {
    return { data };
  }

  protected static isAuthorized(userClaims: UserClaims): boolean {
    return userClaims !== null;
  }

  protected static getUserClaims(context: Context): UserClaims {
    const userClaims = context._userClaims;
    if (!userClaims) {
      throw new UnauthorizedError();
    }

    return userClaims;
  }

  protected static getUserRole(context: Context): UserRole {
    return Router.getUserClaims(context).role;
  }

  protected static assertProtectedPermission(userClaims: UserClaims) {
    if (!Router.isAuthorized(userClaims)) {
      throw new UnauthorizedError();
    }
  }

  protected static assertSpecificPermissions(context: Context, allowedRoles: UserRole[]) {
    if (allowedRoles.length === 0) {
      throw new Error("Please set at least 1 role");
    }

    const userClaims = Router.getUserClaims(context);
    const isAuthorized = Router.isAuthorized(userClaims);
    if (!isAuthorized || !allowedRoles.includes(userClaims.role)) {
      throw new UnauthorizedError();
    }
  }

  protected static assertAdminPermission(context: Context) {
    const userClaims = Router.getUserClaims(context);
    const isAuthorized = Router.isAuthorized(userClaims);
    if (!isAuthorized || userClaims.role !== UserRole.ADMIN) {
      throw new UnauthorizedError();
    }
  }

  protected static getRequestId(context: Context): string {
    return context._requestId;
  }

  protected static getAppId(context: Context): string {
    return context._appId;
  }

  protected static assertInternalPermission(context: Context) {
    if (context._allowInternalAccess !== true) {
      // TODO send sms/email alert including request, body, headers, path, method
      throw new NotFoundError();
    }
  }

  protected buildSuccessArrayBodyWithoutPaging<T>(data: T[]): SuccessArrayResponseWithoutPaging<T> {
    return { data };
  }

  protected buildSuccessArrayBody<T>(data: T[], pagination: Pagination): SuccessArrayResponse<T> {
    const nextPageToken = this.pageTokenUtils.buildNextPageToken(pagination, data.length);
    const prevPageToken = this.pageTokenUtils.buildPrevPageToken(pagination);
    return {
      data,
      pageInfo: {
        nextPageToken,
        prevPageToken,
        resultPerPage: pagination.limit,
      },
    };
  }

  protected handleProtectedRoute(handler: (context: Context) => Promise<any>): (context: Context) => Promise<any> {
    return async (context: Context): Promise<any> => {
      const userClaims = Router.getUserClaims(context);
      Router.assertProtectedPermission(userClaims);
      await handler(context);
    };
  }

  protected handleAdminRoute(handler: (context: Context) => Promise<any>): (context: Context) => Promise<any> {
    return async (context: Context): Promise<any> => {
      Router.assertAdminPermission(context);
      await handler(context);
    };
  }

  protected handleSpecificRolesRoute(
    handler: (context: Context) => Promise<any>,
    allowedRoles: UserRole[],
  ): (context: Context) => Promise<any> {
    return async (context: Context): Promise<any> => {
      Router.assertSpecificPermissions(context, allowedRoles);
      await handler(context);
    };
  }

  protected handlePublicRoute(handler: (context: Context) => Promise<any>): (context: Context) => Promise<any> {
    return async (context: Context): Promise<any> => {
      await handler(context);
    };
  }

  protected handleInternalRoute(handler: (context: Context) => Promise<any>): (context: Context) => Promise<any> {
    return async (context: Context): Promise<any> => {
      Router.assertInternalPermission(context);
      await handler(context);
    };
  }
}

interface SuccessResponse<T> {
  data: T;
}

interface SuccessArrayResponseWithoutPaging<T> {
  data: T[];
}

interface SuccessArrayResponse<T> {
  data: T[];
  pageInfo: any;
}
