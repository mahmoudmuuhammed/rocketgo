import { Router } from "express";
import authController from "./auth.controller";

export default (app: Router) => {
  const route = Router();

  app.use("/auth", route);

  route.get("/hello", authController.sayHello);
};
