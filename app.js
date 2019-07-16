var http = require ('http');
var fs = require('fs');
var port = 3000;
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHbs = require('express-handlebars');
var jsFile = require('./js/GS1DigitalLinkToolkit');
var app = express();

app.use(express.static(path.join(__dirname, 'js')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
var server = http.createServer(function(req,res){
  res.writeHead(200,{'Content-Type': 'text/html'})
  fs.readFile('index.html', function(error,data){
    if (error) {
      res.writeHead(404);
      res.write('Error file not found');
    }else {
      res.write(data);
    }
    res.end();
  })
});
server.listen(port,function(error){
  if(error){
    console.log('Something went wrong', error);
  }else {
    console.log("server is listening on port 3000");
  }
})
module.exports = app;
