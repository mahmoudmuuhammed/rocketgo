import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom.error";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof CustomError)
    return res
      .status(error.statusCode)
      .json({ errors: error.serializeError() });

  return res.status(400).json({
    errors: [{ message: error.message }],
  });
};
