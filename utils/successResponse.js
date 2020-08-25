const log4js = require('log4js');
const { LOGS, STATUSES } = require('../constants');

const logger = log4js.getLogger();

const successResponse = (
  res,
  message = LOGS.SUCCESS.DEFAULT,
  payload = null,
  status = STATUSES.RESPONSE.SUCCESS.DEFAULT,
) => {
  logger.info(message);
  return res.json({
    success: true,
    payload,
    status,
    message,
  });
};

module.exports = successResponse;
