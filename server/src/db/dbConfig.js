const mysql = require('mysql');

const connectToDatabase = () => {
  const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'lizaso_db'
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
