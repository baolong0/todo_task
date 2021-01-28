import { Context } from "koa";
import StringUtils from "Utils/stringUtils";
import Constant from "Common/constant";

export default function requestIdMiddleware(): (context: Context, next: () => Promise<any>) => any {
  return async (context: Context, next: () => Promise<any>): Promise<any> => {
    const requestId = generateRequestId();
    context._requestId = requestId;

    await next();
  };
}

/**
 * Generate random requestId with format: req_xxxxxxxxxxxxxx (14 random chars)
 * For more information. Refer to this: https://stackoverflow.com/a/44678459
 */
function generateRequestId(): string {
  const randomStr = StringUtils.genRandomAlphabetStr(Constant.LENGTH_REQUEST_ID);
  return `req_${randomStr}`;
}
