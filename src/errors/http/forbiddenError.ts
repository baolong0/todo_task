import SystemMessage from "Common/systemMessage";
import HttpBaseError from "Errors/http/httpBaseError";

export default class ForbiddenError extends HttpBaseError {
  constructor(message: string = SystemMessage.FORBIDDEN_ERROR, stack?: string) {
    super(403, message, stack);
  }
}
