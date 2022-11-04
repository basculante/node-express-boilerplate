import Redis from "ioredis";
import Logger from "./logger";

export const redisClient = new Redis(
  process.env.REDIS_URL || "redis://localhost:6379/0"
);

redisClient.on("connect", () => {
  Logger.info("Redis client connected");
});
