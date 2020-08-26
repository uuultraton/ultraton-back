const { User } = require('../models');
const { LOGS, STATUSES } = require('../constants');

const { errorHandler, successResponse } = require('../utils');

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId });

    if (!user) return errorHandler(res, LOGS.ERROR.USER_NOT_EXIST);

    return successResponse(res, STATUSES.RESPONSE.SUCCESS.DEFAULT, user);
  } catch (error) {
    return errorHandler(res, error.message);
  }
};

const updateAvatar = async (req, res) => {
  const { file } = req.body;

  if (!file) return errorHandler(res, LOGS.ERROR.AVATAR_UPLOAD);

  try {
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: req.userId,
      },
      {
        avatarBuffer: {
          data: fs.readFileSync(file.path),
          contentType: file.mimetype,
        },
        $push: {
          logs: {
            message: 'avatar updated',
          },
        },
      },
      { new: true },
    );

    // req.io.emit('updateAvatar', updatedUser);

    return successResponse(res, LOGS.SUCCESS.AVATAR_UPLOAD);
  } catch (error) {
    return errorHandler(res, error.message);
  }
};

const updateAbout = async (req, res) => {
  const { about } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: req.userId,
      },
      {
        profile: {
          about,
        },
        $push: {
          logs: {
            message: 'about updated',
          },
        },
      },
      { new: true },
    );

    // req.io.emit('updateAbout', updatedUser);

    return successResponse(res, LOGS.SUCCESS.USER_INFO_UPDATE);
  } catch (error) {
    return errorHandler(res, error.message);
  }
};

module.exports = {
  getUser,
  updateAvatar,
  updateAbout,
};
