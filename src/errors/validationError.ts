import BaseError from "Errors/baseError";
import ValidationErrorItem from "Errors/validationErrorItem";

export default class ValidationError extends BaseError {
  constructor(message: string, public readonly reasons: ValidationErrorItem[], stack?: string) {
    super(message, stack);
  }
}
