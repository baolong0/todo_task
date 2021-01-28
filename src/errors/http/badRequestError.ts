import HttpBaseError from "Errors/http/httpBaseError";

export default class BadRequestError extends HttpBaseError {
  constructor(message: string, stack?: string) {
    super(400, message, stack);
  }
}
