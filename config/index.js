const config = {
  dbUr: process.env.MONGODB_URI || 'mongodb://localhost/ultraton',
  port: process.env.PORT || 5051,
  env: process.env.NODE_ENV || 'development',
  secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret',
};

module.exports = config;
