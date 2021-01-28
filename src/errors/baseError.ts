export default class BaseError extends Error {
  constructor(message: string, stack?: string) {
    // Call parent constructor
    super(message);

    // Saving class name in the property of our custom error as a shortcut
    this.name = this.constructor.name;

    if (stack) {
      this.stack = stack;
    } else {
      // Capturing stack trace, excluding constructor call from it.
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
