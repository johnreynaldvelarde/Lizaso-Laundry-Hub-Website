const mysql = require('mysql');
const dotnev = require('dotenv');
dotnev.config({path: './.env'})


const connectToDatabase = () => {
  const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
  });

  db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      process.exit(1);
    }
    console.log('Connected to the database.');
  });

  return db;
};

module.exports = { connectToDatabase };
