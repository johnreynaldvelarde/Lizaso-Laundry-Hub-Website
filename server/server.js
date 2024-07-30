// Dependencies
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // For hashing passwords

const app = express();
const port = 3002;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON request bodies

// Database configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'lizaso_db'
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1); // Exit the process if connection fails
  }
  console.log('Connected to the database.');
});

// Define routes
app.get('/', (req, res) => {
  res.json("From backend side");
});

app.get('/User_Account', (req, res) => {
  const sql = "SELECT * FROM User_Account";
  db.query(sql, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error fetching data from the database.' });
    }
    res.json(data);
  });
});

app.post('/User_Account', (req, res) => {
  const { firstName, middleName, lastName, userName, password, isAgreement } = req.body;

  // Validate request data
  if (!firstName || !lastName || !userName || !password || typeof isAgreement !== 'boolean') {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  // Hash the password before storing it
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error hashing password.' });
    }

    // Insert data into the database
    const sql = `
      INSERT INTO User_Account (first_name, middle_name, last_name, username, password, isAgreement, user_type, isOnline, isArchive, date_created)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;

    const values = [
      firstName,
      middleName,
      lastName,
      userName,
      hashedPassword, // Use hashed password
      isAgreement,
      1, // user_type is always 1
      false, // is_online is boolean false
      0 // is_archive is always 0
    ];

    db.query(sql, values, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error inserting data into the database.' });
      }
      res.status(201).json({ message: 'Account created successfully!', data: results });
    });
  });
});

// Gracefully close the connection when exiting the application
process.on('SIGINT', () => {
  db.end((err) => {
    if (err) {
      console.error('Error closing the database connection:', err);
    } else {
      console.log('Database connection closed.');
    }
    process.exit(0);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
