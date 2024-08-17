import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ success: false, message: 'No token provided.' });

  jwt.verify(token, "jwt-secret-key", (err, user) => {
    if (err) return res.status(403).json({ success: false, message: 'Invalid token.' });
    req.user = user;
    next();
  });
};

// Use the middleware in your routes
app.use('/api/protected-route', authenticateToken, (req, res) => {
  res.json({ message: 'You have access to this route.', user: req.user });
});
