const Joi = require('@hapi/joi');

module.exports = {
  signup: Joi.object({
    firstName: Joi.string().min(3).max(30).required(),

    lastName: Joi.string().min(3).max(30).required(),

    email: Joi.string().email().required(),

    password: Joi.string()
      .min(3)
      .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/)
      .required(),
  }),

  login: Joi.object({
    email: Joi.string().email().required(),

    password: Joi.string()
      .min(3)
      .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/)
      .required(),
  }),
};
