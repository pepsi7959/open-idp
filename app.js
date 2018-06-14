'use strict'
const express = require('express');
const session = require('express-session');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('./config');

const index = require('./routes/index');
const adminIndex = require('./routes/admin/index');
const user = require('./routes/admin/user');
const dashboard = require('./routes/admin/dashboard');
const oauth = require('./routes/idp/oauth');
const client = require('./routes/admin/client');
const auth = require('./routes/idp/auth');
const idp = require('./routes/idp/idp');

const app = express();
app.set('json spaces', 4);
app.use(session({
  secret: 'OpenIDPSecret',
}));

app.use(function(req, res, next) {
  res.locals.user = req.session.user;
  next();
});

app.locals.baseUrl = config.baseUrl;
app.locals.version = config.version;
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

app.use('/', index);
app.use('/admin', adminIndex);
app.use('/admin/user', user);
app.use('/admin/dashboard', dashboard);
app.use('/admin/client', client);
app.use('/oauth', oauth);
app.use('/idp/auth', auth);
app.use('/idp', idp);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
