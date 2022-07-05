import { CustomError } from "./custom.error";
import { ValidationError } from "express-validator";

export class RequestValidationError extends CustomError {
  statusCode: number = 400;
  constructor(private errors: ValidationError[]) {
    super("Request Validation Error");
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeError(): { message: string; field?: string }[] {
    return this.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });
  }
}
