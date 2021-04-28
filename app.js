const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const config = require('./app/config')
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');


const app = express();

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
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Mise en place du répertoire static
app.use(express.static(path.join(__dirname, 'public')));
// Middleware favicon
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')))


//Ajout du middleware express session
const session = require('express-session');
app.use(session({
  secret: config.appKey, resave: false, saveUninitialized: false,
  cookie: { maxAge: 3600000 }
}));
//----------

//Ajout du middleware flash pour la gestion des messages flash
const flash = require('express-flash-messages');
app.use(flash());

//test csrf 
// require('./src/services/randomTokenCsrf')(req, res);


// permet d'envoyer des variables à toutes les vues
app.use((req, res, next) => {

  //dev admin session
  // req.session.users = config.userDevAdmin;
  // console.log(res.locals)
  res.locals.session = req.session;



  // if (res.locals.session !== undefined) {
  //   console.log('---app.js---');
  // console.log(res.locals.session)
  //   console.log(res.locals)
  // }

  next();
});


//gestion des routes
require('./app/routes')(app);


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
