const createUser = require('./createUser'),
  createToken = require('./createToken'),
  hashPassword = require('./hashPassword'),
  comparePasswords = require('./comparePasswords');

module.exports = {
  createUser,
  createToken,
  hashPassword,
  comparePasswords,
};
