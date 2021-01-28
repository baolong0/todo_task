import { HttpRequestHeader } from "Common/httpRequestHeader";
import UserRole from "Common/userRole";
import UnauthorizedError from "Errors/http/unauthorizedError";
import UserNotFoundExistError from "Errors/user/userNotFoundError";
import { Context } from "koa";
import { GetActiveUserUS } from "Usecases/user/getActiveUserUS";
import { Logger } from "Utils/logger";

export default function authorizeMiddleware(
  getActiveUserUS: GetActiveUserUS,
  logger: Logger,
): (context: Context, next: () => Promise<any>) => any {
  return async (context: Context, next: () => Promise<any>): Promise<any> => {
    try {
      // Clear if existing
      context._userRole = UserRole.ANONYMOUS;
      context._userClaims = null;

      const userId = context.request.headers[HttpRequestHeader.HEADER_AUTHORIZATION];
      if (userId) {
        const user = await getActiveUserUS.execute({ userId }, context._requestId);
        context._userClaims = {
          userId: user.id,
          role: user.role,
        };
      }
    } catch (error) {
      logger.traceI(context._requestId, `Decode token failed. Code: ${error.code}, message: ${error.message}`);

      if (error instanceof UserNotFoundExistError) {
        throw new UnauthorizedError("Provided token is invalid");
      }
    }

    await next();
  };
}
