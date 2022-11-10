const createError = require('http-errors');
const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const dotenv = require("dotenv");

const indexRouter = require('./routes/web/index');
// const usersRouter = require('./routes/web/users');
const authRouter = require('./routes/api/auth')
const usersRouter = require('./routes/api/users');
const productRouter = require('./routes/api/products');
const categoriesRouter = require('./routes/api/categories');
const searchRouter = require('./routes/api/search');
const uploadsRouter = require('./routes/api/uploads');

const dbConnection = require('./database/config');


const app = express();
dotenv.config();

dbConnection()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/tmp/' }));

// routes
app.use('/', indexRouter);
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter);
app.use('/api/products', productRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/search', searchRouter);
app.use('/api/uploads', uploadsRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
