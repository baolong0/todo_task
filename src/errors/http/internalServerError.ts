import SystemMessage from "Common/systemMessage";
import HttpBaseError from "Errors/http/httpBaseError";

export default class InternalServerError extends HttpBaseError {
  constructor(message: string = SystemMessage.SYSTEM_ERROR, stack?: string) {
    super(500, message, stack);
  }
}
