// const jwt = require('jsonwebtoken');
// const { JWT_SECRET } = require('../config/config'); // Import JWT secret

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
//   }

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.status(403).json({ success: false, message: 'Invalid token.' });
//     }
//     req.user = user; // Attach user info to the request
//     next(); // Pass control to the next middleware or route handler
//   });
// };

// module.exports = authenticateToken;
// src/middlewares/authenticateToken.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token == null) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;

