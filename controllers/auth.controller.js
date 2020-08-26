const { User } = require('../models');
const { LOGS } = require('../constants');

const {
  errorHandler,
  successResponse,
  createUser,
  createToken,
  hashPassword,
  comparePasswords,
} = require('../utils');

const postSignUp = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return errorHandler(res, LOGS.ERROR.REGISTER);
  }

  const newUser = {
    email,
    profile: {
      firstName,
      lastName,
    },
  };

  return hashPassword(password)
    .then((hashedPass) => createUser(newUser, hashedPass))
    .then(() => successResponse(res, LOGS.SUCCESS.REGISTER))
    .catch((err) => errorHandler(res, err.message));
};

const postLogin = async (req, res) => {
  const { email, password } = req.body;
  let user;

  try {
    user = await User.findOne({ email });
  } catch (error) {
    return errorHandler(res, error.message);
  }
  if (!user) {
    return errorHandler(res, LOGS.ERROR.LOGIN);
  }

  const compareResult = await comparePasswords(password, user.password);
  if (!compareResult) {
    return errorHandler(res, LOGS.ERROR.PASS_COMPARING);
  }

  return successResponse(res, LOGS.SUCCESS.LOGIN, {
    jwt_token: createToken(user._id),
    userId: user._id,
  });
};

module.exports = {
  postSignUp,
  postLogin,
};
