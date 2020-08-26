const { User } = require('../models');
const { LOGS, STATUSES } = require('../constants');

const { errorHandler, successResponse } = require('../utils');

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: `${id}` });

    if (!user) return errorHandler(res, LOGS.ERROR.USER_NOT_EXIST);

    return successResponse(res, STATUSES.RESPONSE.SUCCESS.DEFAULT, user);
  } catch (error) {
    return errorHandler(res, error.message);
  }
};

const getSkills = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (!user) return errorHandler(res, LOGS.ERROR.USER_NOT_EXIST);

    return successResponse(res, STATUSES.RESPONSE.SUCCESS.DEFAULT, user.skills);
  } catch (error) {
    return errorHandler(res, error.message);
  }
};

const updateSkills = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (!user) return errorHandler(res, LOGS.ERROR.USER_NOT_EXIST);

    const { learnt, plannedToLearn } = req.body;

    if (!learnt || !plannedToLearn)
      return errorHandler(res, LOGS.ERROR.DEFAULT);

    const updatedUser = await User.findOneAndUpdate(
      {
        _id: id,
      },
      {
        skills: {
          learnt,
          plannedToLearn,
        },
        $push: {
          logs: {
            message: 'skills updated',
          },
        },
      },
      { new: true },
    );

    return successResponse(
      res,
      STATUSES.RESPONSE.SUCCESS.DEFAULT,
      updatedUser.skills,
    );
  } catch (error) {
    return errorHandler(res, error.message);
  }
};

const updateAvatar = async (req, res) => {
  const { id } = req.params;
  const { file } = req.body;

  if (!file) return errorHandler(res, LOGS.ERROR.AVATAR_UPLOAD);

  try {
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: id,
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
  const { id } = req.params;
  const { about } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      {
        _id: id,
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
  getSkills,
  updateSkills,
  updateAvatar,
  updateAbout,
};
