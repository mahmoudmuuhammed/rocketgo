import { Request, Response, NextFunction } from "express";
import authService from "./auth.service";
import { SignupDto, LoginDto } from "./dtos";

async function signup(req: Request, res: Response, next: NextFunction) {
  const reqInput: SignupDto = req.body;
  try {
    const result = await authService.createUser(reqInput);
    res.status(201).json(result);
  } catch (error) {
    return next(error);
  }
}

async function login(req: Request, res: Response, next: NextFunction) {
  const reqInput = req.body as LoginDto;
  try {
    const result = await authService.logUser(reqInput);
    res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

export default { signup, login };
