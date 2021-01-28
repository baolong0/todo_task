import SystemMessage from "Common/systemMessage";
import BaseError from "Errors/baseError";
import HttpBaseError from "Errors/http/httpBaseError";
import ValidationError from "Errors/validationError";
import ValidationErrorItem from "Errors/validationErrorItem";
import { Context } from "koa";
import { Logger } from "Utils/logger";

export default function errorHandlerMiddleware(logger: Logger): (context: Context, next: () => Promise<any>) => any {
  return async (context: Context, next: () => Promise<any>): Promise<any> => {
    try {
      await next();
    } catch (error) {
      const requestId = context._requestId;
      const request = context.request;
      if (error instanceof ValidationError) {
        logger.traceW(
          requestId,
          error.message,
          { url: request.originalUrl, method: request.method, headers: request.headers, body: request.body },
          error,
        );
        const httpCode = 400;
        context.status = httpCode;
        context.body = buildValidationErrorBody(httpCode, error.message, error.reasons);
        return;
      }

      if (error instanceof HttpBaseError) {
        logger.traceW(
          requestId,
          error.message,
          { url: request.originalUrl, method: request.method, headers: request.headers, body: request.body },
          error,
        );
        context.status = error.code;
        context.body = buildErrorBody(error.code, error.message);
        return;
      }

      if (error instanceof BaseError) {
        logger.traceW(
          requestId,
          error.message,
          { url: request.originalUrl, method: request.method, headers: request.headers, body: request.body },
          error,
        );
        context.status = 422; // UnprocessableEntity
        context.body = buildErrorBody(422, error.message);
        return;
      }

      logger.traceE(
        requestId,
        error.message,
        { url: request.originalUrl, method: request.method, headers: request.headers, body: request.body },
        error,
      );
      context.status = 500;
      context.body = buildErrorBody(500, SystemMessage.SYSTEM_ERROR);
    }
  };
}

function buildErrorBody(errorCode: number, errorMessage: string): ErrorRes {
  return {
    status: errorCode,
    message: errorMessage,
  };
}

function buildValidationErrorBody(
  errorCode: number,
  errorMessage: string,
  validationErrorItems: ValidationErrorItem[],
): ValidationErrorRes {
  return {
    status: errorCode,
    message: errorMessage,
    reasons: validationErrorItems.map((i) => ({ path: i.path.join("."), message: i.message })),
  };
}

interface ErrorRes {
  readonly status: number;
  readonly message: string;
}

interface ValidationErrorRes extends ErrorRes {
  readonly reasons: ValidationErrorReason[];
}

interface ValidationErrorReason {
  readonly path: string;
  readonly message: string;
}
