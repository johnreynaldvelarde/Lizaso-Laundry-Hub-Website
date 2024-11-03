// import mysql from "mysql2/promise";
// import dotenv from "dotenv";

// dotenv.config({ path: "./.env" });

// let pool;

// const getPool = async () => {
//   if (!pool) {
//     pool = mysql.createPool({
//       host: process.env.DB_HOST,
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_DATABASE,
//       waitForConnections: true,
//       connectionLimit: 10, // Adjust based on your needs
//       queueLimit: 0,
//     });
//   }
//   return pool;
// };

// export { getPool };

import mysql from "mysql2/promise";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config({ path: "./.env" });

let pool;

// Construct the database URL from environment variables
const urlDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQL_ROOT_PASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQL_DATABASE}`;

const getPool = async () => {
  if (!pool) {
    pool = mysql.createPool(urlDB);
  }
  return pool;
};

export { getPool };
