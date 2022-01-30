const redis = require("redis");

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  username: process.env.REDIS_USER,
  password: process.env.REDIS_PASS,
});

redisClient.on("connect", () => {
  console.log("Terkoneksi ke redis");
});

redisClient.on("error", (error) => {
  console.log("Koneksi ke redis bermasalah: ", error);
});

redisClient.connect();

module.exports = redisClient;
