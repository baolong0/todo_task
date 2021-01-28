import BaseError from "Errors/baseError";

export default class HttpBaseError extends BaseError {
  public readonly code: number;
  constructor(code: number, message: string, stack?: string) {
    // Call parent constructor
    super(message, stack);

    // Custom properties
    this.code = code || 500;
  }
}
