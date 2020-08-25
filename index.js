const express = require('express'),
  errorhandler = require('errorhandler'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('config');

const app = express();
const log4js = require('log4js');

const { MONGO_URI } = config.get('DB');
const { PORT } = config.get('SERVER');
const { connectDB } = require('./utils');

const isProduction = process.env.PRODUCTION || config.get('isProduction');

const dbConnection = connectDB();
const logger = log4js.getLogger();

const authRouter = require('./routes/auth');

logger.level = config.get('LOGGER_LVL');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

if (!isProduction) {
  app.use(errorhandler());
}

if (!dbConnection) {
  //   return;
}

if (!isProduction) {
  mongoose.set('debug', true);
}

app.use('/api/auth', authRouter);

// start server
app.listen(process.env.PORT || PORT, () => {
  console.log('Listening on port ' + PORT);
});
