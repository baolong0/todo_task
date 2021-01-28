import BaseError from "Errors/baseError";

export default class UserNotFoundExistError extends BaseError {
  constructor(message: string = "User not found", stack?: string) {
    super(message, stack);
  }
}
