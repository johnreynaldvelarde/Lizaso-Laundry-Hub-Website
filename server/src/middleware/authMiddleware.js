// import jwt from 'jsonwebtoken';

// const verifyToken = (req, res, next) => {
//   const token = req.cookies.auth_token || req.headers['authorization'];
//   if (!token) return res.status(401).send('Access Denied');

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;
//     next(); // Proceed to the next middleware or route handler
//   } catch (err) {
//     res.status(400).send('Invalid Token');
//   }
// };

// export default verifyToken;
// import jwt from 'jsonwebtoken';

// const verifyToken = (req, res, next) => {
//   const token = req.cookies.auth_token || req.headers['authorization'];
//   if (!token) return res.status(401).send('Access Denied');

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(400).send('Invalid Token');
//   }
// };

// export default verifyToken;

// middleware/authMiddleware.js

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.ACCESTS_TOKEN_SECRET || 'your_jwt_secret_key';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // No token provided

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Token is invalid or expired
    req.user = user; // Attach the user information to the request object
    next(); // Proceed to the next middleware or route handler
  });
};


