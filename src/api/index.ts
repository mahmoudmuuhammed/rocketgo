import { Router } from "express";
import authRoutes from "./auth/auth.routes";

export default () => {
  const app = Router();

  authRoutes(app);

  return app;
};
