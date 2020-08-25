const { errorHandler } = require('../utils');

module.exports = (schema, property) => {
  return async (req, res, next) => {
    try {
      const validated = await schema.validate(req[property]);

      if (validated.error) {
        return errorHandler(res, validated.error.details);
      }

      next();
    } catch (error) {
      return errorHandler(error.message);
    }
  };
};
