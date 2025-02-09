var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/index');

var createAccount = require('./routes/createaccount');
var loginRouter = require('./routes/login');
var addDoctorRouter = require('./routes/addevent');
var getProductRouter = require('./routes/getevent');

var elasticPost = require('./routes/updateelastic');
var elasticload = require('./routes/loadelastic');
var elasticdelete = require('./routes/deleteelastic');
var elasticSearch = require('./routes/searchelastic')
var geocode = require('./routes/geocode');
var getAnalytics = require('./routes/analytics');

var geodataRouter = require('./routes/getgeodata');
var yelpdataRouter = require('./routes/yelpreviewdata');
var modifyDocRouter = require('./routes/modifyevent');
var deletedDocRouter = require('./routes/deletebooking');
var bookAppntRouter = require('./routes/bookevent');
var delAppntRouter = require('./routes/deletenewevent');
var getDocIdRouter = require('./routes/searchevent');
var reviewRouter = require('./routes/review');
var getUser = require('./routes/getusers');
var modifyUser = require('./routes/modifyusers');
var getReview = require('./routes/getreview');
var serp = require('./routes/serp');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/create-account',createAccount);
app.use('/login',loginRouter);
app.use('/add-event',addDoctorRouter);
app.use('/get-events',getProductRouter);
app.use('/get-geo-data',geodataRouter);
app.use('/yelp-data',yelpdataRouter);
app.use('/update-event',modifyDocRouter);
app.use('/delete-booking',deletedDocRouter);

app.use('/book-event',bookAppntRouter);
app.use('/delete-event',delAppntRouter);
app.use('/search-event',getDocIdRouter);
app.use('/review',reviewRouter);
app.use('/get-review',getReview);

app.use('/get-analytics',getAnalytics);
app.use('/get-users',getUser);
app.use('/update-users',modifyUser);

app.use('/serp', serp);
app.use('/geocode',geocode);
app.use('/delete',elasticdelete);
app.use('/search',elasticSearch);
app.use('/load',elasticload);
app.use('/update', elasticPost);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
