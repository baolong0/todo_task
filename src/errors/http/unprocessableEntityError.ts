import HttpBaseError from "Errors/http/httpBaseError";

export default class UnprocessableEntityError extends HttpBaseError {
  constructor(message: string, stack?: string) {
    super(422, message, stack);
  }
}
