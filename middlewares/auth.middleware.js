const jwt = require('jsonwebtoken');
const config = require('config');

const { User } = require('../models');

const { LOGS } = require('../constants');
const { errorHandler } = require('../utils');

module.exports = async (req, res, next) => {
  try {
    const jwt_token = req.header('authorization');

    if (!jwt_token) return res.status(401).json({ status: 'Unauthorized' });

    const { userId } = jwt.verify(jwt_token, config.get('JWT_SECRET'));

    const foundUser = await User.findOne({ _id: userId });

    if (foundUser) {
      req.userId = userId;
    } else {
      return errorHandler(res, LOGS.ERROR.USER_NOT_EXIST);
    }
  } catch (error) {
    return errorHandler(res, error.message);
  }

  next();
};
