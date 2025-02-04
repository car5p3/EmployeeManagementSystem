const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Token = require('../models/Token');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    // Check if the token is blacklisted
    const isBlacklisted = await Token.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ message: 'Token is invalid' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

const roleMiddleware = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

module.exports = { authMiddleware, roleMiddleware };