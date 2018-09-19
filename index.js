const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const app = express();

// 라우터
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const listsRouter = require('./routes/lists');

// sequelize의 sync() 메서드 호출
let models = require('./models/index');
models.sequelize.sync().then(() => {
  console.log('> Succeeded DB connection');
}).catch(err => {
  console
    .log('> Failed DB connection')
    .log(err);
});

// 뷰엔진설정
app
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'pug');

// 미들웨어 설정
app
  .use(logger('dev'))
  .use(bodyParser.json())
  .use(express.urlencoded({
    extended: false
  }))
  .use(express.static(path.join(__dirname, 'public')))
  .use(methodOverride('_method'))

// 라우터 사용
app
  .use('/', indexRouter)
  .use('/users', usersRouter)
  .use('/lists', listsRouter);

// 오류 핸들러
app
  .use(function (req, res, next) {
    next(createError(404));
  })
  .use(function (err, req, res, next) { // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
  });

app.listen(3000, () => {
  console.log('> Server is running on port 3000');
});