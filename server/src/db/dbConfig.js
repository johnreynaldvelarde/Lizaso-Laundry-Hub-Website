// const mysql = require('mysql');
// const dotnev = require('dotenv');
// dotnev.config({path: './.env'})


// const connectToDatabase = () => {
//   const db = mysql.createConnection({
//     host: process.env.DATABASE_HOST,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE
//   });

//   db.connect((err) => {
//     if (err) {
//       console.error('Error connecting to the database:', err);
//       process.exit(1);
//     }
//     console.log('Connected to the database.');
//   });

//   return db;
// };

// module.exports = { connectToDatabase };
// import mysql from 'mysql2/promise';
// import dotenv from 'dotenv';

// dotenv.config({ path: './.env' });

// const connectToDatabase = async () => {
//   try {
//     const connection = await mysql.createConnection({
//       host: process.env.DATABASE_HOST,
//       user: process.env.DATABASE_USER,
//       password: process.env.DATABASE_PASSWORD,
//       database: process.env.DATABASE
//     });
//     console.log('Connected to the database.');
//     return connection;
//   } catch (err) {
//     console.error('Error connecting to the database:', err);
//     process.exit(1);
//   }
// };

// export { connectToDatabase };

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

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
      queueLimit: 0
    });
  }
  return pool;
};

export { getPool };



