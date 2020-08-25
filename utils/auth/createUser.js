const { User } = require('../../models');

const createUser = (user, hashedPass) =>
  new User({ ...user, password: hashedPass }).save();

module.exports = createUser;
