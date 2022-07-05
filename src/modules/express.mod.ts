import express from "express";
import helmet from "helmet";
import cors from "cors";
import config from "../config";
import appRoutes from "../api";
import middlewares from "../api/middlewares";
import bodyParser from "body-parser";

export default ({ app }: { app: express.Application }) => {
  app.get("/", (req, res) => {
    res.status(200).send("<h1>Rocketgo server is working</h1>");
  });

  app.use(helmet());

  app.enable("trust proxy");

  app.use(cors());

  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(bodyParser.json());

  app.use(config.api.prefix, appRoutes());

  app.use(middlewares.errorHandler);
};
