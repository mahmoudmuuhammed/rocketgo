import { CustomError } from "./custom.error";

export class BadRequestError extends CustomError {
  statusCode: number = 400;
  constructor(public message: string, public field?: string) {
    super(message, field);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeError(): { message: string; field?: string }[] {
    return [{ message: this.message, field: this.field }];
  }
}
