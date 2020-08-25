const jwt = require('jsonwebtoken');
const config = require('config');

const secret = config.get('JWT_SECRET');

const createToken = (userId) => jwt.sign(
  { token: userId },
  process.env.JWT_SECRET || secret,
  { expiresIn: '1d' },
);
module.exports = createToken;