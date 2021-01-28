import SystemMessage from "Common/systemMessage";
import HttpBaseError from "Errors/http/httpBaseError";

export default class NotFoundError extends HttpBaseError {
  constructor(message: string = SystemMessage.RESOURCE_NOT_FOUND_ERROR, stack?: string) {
    super(404, message, stack);
  }
}
