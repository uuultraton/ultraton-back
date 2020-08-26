const Joi = require('@hapi/joi');

module.exports = {
  avatarUpload: Joi.object({
    file: {
      path: Joi.any(),
      mimetype: Joi.any(),
    },
  }),

  aboutUpload: Joi.object({
    about: Joi.string().min(3)
  })
};
