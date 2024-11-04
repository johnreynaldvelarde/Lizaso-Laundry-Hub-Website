import mysql from "mysql2/promise";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config({ path: "./.env" });

let pool;

// Construct the database URL from environment variables
const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQL_ROOT_PASSWORD}@${process.env.RAILWAY_TCP_PROXY_DOMAIN}:${process.env.RAILWAY_TCP_PROXY_PORT}/${process.env.MYSQL_DATABASE}`;

const getPool = async () => {
  if (!pool) {
    pool = mysql.createPool(urlDB);
  }
  return pool;
};

export { getPool };
