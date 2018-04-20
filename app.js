const five = require('johnny-five');
const express = require("express");
const app     = express();
const io = require('socket.io');
const path =require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/database');


// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// database connections
mongoose.connect(config.database);
let db = mongoose.connection;

// Check connection
db.once('open', function(){
  console.log('Connected to MongoDB');
});

// Check for DB errors
db.on('error', function(err){
  console.log(err);
});

// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Express Session Middleware
app.use(session({
  secret: 'frezgi',
  resave: true,
  saveUninitialized: true
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  next();
});


//render static files
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname+'/script'));

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});


// Route Files
let users = require('./routes/users');
let ami = require('./routes/pages');
app.use('/users', users);
app.use('/ami', ami);



app.listen(3000, function(){
	console.log('listening on *:3000');
});
