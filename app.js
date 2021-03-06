var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var renyan = require('./middleware/renyan')

var routes = require('./routes/index');
var users = require('./routes/users');
var maps = require('./routes/maps')
var content = require('./routes/content.js')
var drawingboard = require('./routes/drawingboard')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(renyan)

app.use('/', routes);
app.use('/users', users);
app.use('/map', maps)
app.use('/content', content)
app.use('/drawingboard', drawingboard)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render(app.get('env') === 'production' ?  'error' : 'debug/error', {
    message: err.message,
    error: err
  });
});


module.exports = app;
