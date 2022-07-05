export abstract class CustomError extends Error {
  abstract statusCode: number;
  constructor(public message: string, public field?: string) {
    super(message);
  }

  abstract serializeError(): { message: string; field?: string }[];
}
