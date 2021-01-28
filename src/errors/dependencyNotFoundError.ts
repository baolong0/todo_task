import BaseError from "Errors/baseError";

export default class DependencyNotFoundError extends BaseError {
  constructor(message: string, stack?: string) {
    super(message, stack);
  }
}
