import { Request, Response, NextFunction } from "express";
import authService from "./auth.service";

async function sayHello(req: Request, res: Response, next: NextFunction) {
  const result = await authService.hello();
  res.status(200).json(result);
}

export default { sayHello };
