var http = require ('http');
var fs = require('fs');
var port = 3000;
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var jsFile = require('./src/GS1DigitalLinkToolkit');
var app = express();
var compressFunction = require('./compression');
var uncompressFunction = require('./decompression');
var router = express.Router();
var gs = require('./gs1');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req,res){
  res.sendFile('index.html', {root: path.join(__dirname, './files')})
})

/*app.post('/compression', function(req,resp){ //Post Response
  var compression = req.body.compression;
  var test = compressFunction.compressedDigitalLink(compression);
  console.log("Test : " + test);
});*/


app.post('/decompression', function(req,resp){ //Post Response
  var decompression = req.body.decompression;
  var decompressedLink = uncompressFunction.decompressGS1DigitalLink(decompression)
  console.log("Mon deuxieme test " + decompressedLink);
});

app.listen(3000, function(){
  console.log("Server started");
})





module.exports = app;
