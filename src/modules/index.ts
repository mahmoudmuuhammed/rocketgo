import express from "express";
import expressModule from "./express.mod";
import logger from "./logger.mod";
import prisma from "../client";

export default async ({ app }: { app: express.Application }) => {
  try {
    await prisma.$connect();

    logger.info("🚀 Database is connected");

    expressModule({ app });

    logger.info("⭐️ Express middlewares are loaded");
  } catch (error) {
    logger.error("🔥 Error on app module", error);
    throw error;
  }
};
