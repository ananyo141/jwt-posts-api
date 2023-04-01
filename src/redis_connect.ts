import { createClient } from "redis";

const redis_client = createClient({
  url: process.env.REDIS_HOST!,
});

redis_client.on("error", (err) => {
  console.error(err);
});

redis_client.on("connect", () => {
  console.log("Connecting to Redis");
});

redis_client.connect();

export default redis_client;
