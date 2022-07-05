import "reflect-metadata";
import express from "express";
import config from "./config";
import appModule from "./modules";

async function bootstrap() {
  const app = express();

  await appModule({ app });

  app
    .listen(config.port, () => {
      console.log(
        `Server is running and listening on port ${config.port} here`
      );
    })
    .on("error", (error) => {
      throw error;
    });
}

bootstrap();
