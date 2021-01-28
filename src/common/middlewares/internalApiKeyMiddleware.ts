import { HttpRequestHeader } from "Common/httpRequestHeader";
import { Context } from "koa";

export default function internalApiKeyMiddleware(
  internalApiKey: string,
): (context: Context, next: () => Promise<any>) => any {
  return async (context: Context, next: () => Promise<any>): Promise<any> => {
    const apiKey = context.request.headers[HttpRequestHeader.HEADER_X_API_KEY];

    if (apiKey === internalApiKey) {
      context._allowInternalAccess = true;
    }

    await next();
  };
}
