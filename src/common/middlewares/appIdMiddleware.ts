import { HttpRequestHeader } from "Common/httpRequestHeader";
import { Context } from "koa";

export default function appIdMiddleware(): (context: Context, next: () => Promise<any>) => any {
  return async (context: Context, next: () => Promise<any>): Promise<any> => {
    const appId = context.request.headers[HttpRequestHeader.HEADER_X_APP_ID];
    context._appId = appId;

    await next();
  };
}
