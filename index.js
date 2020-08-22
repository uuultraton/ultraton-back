const express = require('express'),
  errorhandler = require('errorhandler'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('./config');

const isProduction = config.env === 'production';

const app = express();

app.use(cors());

app.use(app.urlencoded({ extended: false }));
app.use(app.json());

app.use(express.static(__dirname + '/public'));

if (!isProduction) {
  app.use(errorhandler());
}

mongoose.connect(config.dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

if (!isProduction) {
  mongoose.set('debug', true);
}

app.use(require('./routes'));

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function (err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

// start server
var server = app.listen(config.port, function () {
  console.log('Listening on port ' + server.address().port);
});
