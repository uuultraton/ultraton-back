const { errorHandler } = require('../utils');

module.exports = (schema, property) =>
  async function (req, res, next) {
    try {
      const validated = await schema.validate(req[property]);

      if (validated.error) {
        return errorHandler(res, validated.error.message);
      }
    } catch (error) {
      return errorHandler(error.message);
    }

    next();
  };
