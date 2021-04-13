var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

const bodyParser = require('body-parser');
// console.log(bodyParser)

//database connection
const mongoose = require('mongoose');

// require('./bdd/database')(mongoose)


var app = express();

// Mise en place du moteur de template
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// middleware sass
app.use(sassMiddleware({
  src: path.join(__dirname, 'build'/* 'build/css' */), // chemin vers le fichier sass source
  dest: path.join(__dirname, 'public'), // chemin vers la le ficher css source
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true,
  debug: false
}));

//// BodyParser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())



// Mise en place du répertoire static
app.use(express.static(path.join(__dirname, 'public')));

//gestion des routes
require('./routes/routes')(app, mongoose)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
