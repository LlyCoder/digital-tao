var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var goods = require('./routes/goods');
var search = require('./routes/search');
var articles = require('./routes/articles');
var admins = require('./routes/adminController')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(session());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'));

//全局登陆拦截
// app.use(function (req, res, next) {
//   if(req.cookies.userId) {
//     next();
//   } else {
//     //设置拦截例外
//     if(req.originalUrl == '/users/login'
//     || req.originalUrl == '/users/logout'
//     || req.path == '/goods/list'
//     || req.originalUrl == '/users/register'
//     || req.originalUrl == '/search/getList'
//     || req.path == '/goods/searchList'
//     || req.originalUrl == '/users/uploads'
//     || req.path == '/users/captcha'
//     || req.originalUrl == '/users/checkRegister'
//     || req.path == '/goods/goodsDetail'
//     || req.originalUrl == '/articles/uploads') {
//       next();
//     } else {
//       res.json({
//         status: '10001',
//         msg: 'Not currently logged in',
//         result: ''
//       });
//     }
//   }
// });

app.use('/', index);
app.use('/users', users);
app.use('/goods', goods);
app.use('/search', search);
app.use('/articles',articles);
app.use('/admins', admins);
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
