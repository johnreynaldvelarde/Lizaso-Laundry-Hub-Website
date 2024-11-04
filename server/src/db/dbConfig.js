import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

let pool;

const getPool = async () => {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      waitForConnections: true,
      connectionLimit: 10, // Adjust based on your needs
      queueLimit: 0,
    });
  }
  return pool;
};

export { getPool };
