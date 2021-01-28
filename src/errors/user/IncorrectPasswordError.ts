import BaseError from "Errors/baseError";

export default class IncorrectPasswordError extends BaseError {
  constructor(message: string = "Incorrect Password, Try again !", stack?: string) {
    super(message, stack);
  }
}
