const connectDB = require('./dbConnection'),
  errorHandler = require('./errorHandler'),
  successResponse = require('./successResponse'),
  authUtils = require('./auth');

module.exports = {
  connectDB,
  errorHandler,
  successResponse,
  ...authUtils,
};
