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
import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.cookies.auth_token || req.headers['authorization'];
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};

export default verifyToken;

