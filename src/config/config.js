const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  BOT_TOKEN: process.env.BOT_TOKEN,
  ADMIN_IDS: process.env.ADMIN_IDS
    ? process.env.ADMIN_IDS.split(",").map((id) => Number(id))
    : [],
  DATABASE_URL: process.env.DATABASE_URL,
  ENVIRONMENT: process.env.NODE_ENV || "development",
  LOG_LEVEL: process.env.LOG_LEVEL || "info",
};
