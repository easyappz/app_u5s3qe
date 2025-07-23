const jwt = require('jsonwebtoken');

// JWT secret key (hardcoded since .env is ignored)
const JWT_SECRET = 'my-secret-key-123';

module.exports = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Authentication token missing' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: `Invalid token: ${error.message}` });
  }
};
