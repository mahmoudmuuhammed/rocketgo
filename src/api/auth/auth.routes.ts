import { Router } from "express";
import middlewares from "../middlewares";
import authController from "./auth.controller";
import validators from "./validators";

export default (app: Router) => {
  const route = Router();

  app.use("/auth", route);

  route.post(
    "/signup",
    validators.signupValidator,
    middlewares.validateRequest,
    authController.signup
  );

  route.post(
    "/login",
    validators.loginValidator,
    middlewares.validateRequest,
    authController.login
  );
};
