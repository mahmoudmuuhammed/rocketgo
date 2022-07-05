import { CustomError } from "./custom.error";

export class NotAuthorizedError extends CustomError {
  statusCode: number = 401;
  constructor(public message: string, public field?: string) {
    super(message, field);
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeError(): { message: string; field?: string }[] {
    return [{ message: this.message, field: this.field }];
  }
}
