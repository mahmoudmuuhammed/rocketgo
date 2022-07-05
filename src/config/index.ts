import dotenv from "dotenv";

dotenv.config();

export default {
  port: parseInt(process.env.PORT!, 10),
  api: {
    prefix: "/api/v1",
  },
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },
};
