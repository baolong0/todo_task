import BaseError from "Errors/baseError";

export default class EmailAlreadyExistError extends BaseError {
  constructor(message: string = "Provided email already exists", stack?: string) {
    super(message, stack);
  }
}
