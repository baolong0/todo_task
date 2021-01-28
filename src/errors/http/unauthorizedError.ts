import SystemMessage from "Common/systemMessage";
import HttpBaseError from "Errors/http/httpBaseError";

export default class UnauthorizedError extends HttpBaseError {
  constructor(message: string = SystemMessage.UNAUTHORIZED_ERROR, stack?: string) {
    super(401, message, stack);
  }
}
