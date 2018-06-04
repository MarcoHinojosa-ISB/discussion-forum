var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, authorization");//, multipart/form-data");
  next();
});

app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));
app.use("/src", express.static(path.join(__dirname, "src")));


app.use("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

module.exports = app;
