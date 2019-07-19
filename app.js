var http = require ('http');
var fs = require('fs');
var port = 3000;
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHbs = require('express-handlebars');
var jsFile = require('./src/GS1DigitalLinkToolkit');
var app = express();

app.use(express.static(path.join(__dirname, 'src')));
app.use('/', jsFile);

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

function compressGS1DigitalLink(digitalLinkURI,useShortText,uriStem,uncompressedPrimary,useOptimisations,compressOtherKeyValuePairs) {
    // extract query string
    let firstQuestionMark = digitalLinkURI.indexOf("?");
    let queryString="";
    let nonGS1keyvaluePairs={};
    if (firstQuestionMark > -1) {
        queryString = digitalLinkURI.substr(1+firstQuestionMark);
    }
    if (queryString !== "") {
        // if semicolon was used as delimiter between key=value pairs, replace with ampersand as delimiter
        queryString = queryString.replace(new RegExp(";", 'g'),"&");

        let firstFragment = queryString.indexOf("#");
        if (firstFragment > -1) {
            queryString = queryString.substring(0,firstFragment);
        }

        let pairs = queryString.split("&");
        for (let i=0; i<pairs.length; i++) {
            let p = pairs[i].split("=");
            // if the key is not numeric AND is not a shortcode such as exp or expdt, then add to the nonGS1keyvalueePairs
            if ((p[0] !== null) && (p[1] !== null) && (!(this.regexAllNum.test(p[0])) && (!(this.shortCodeToNumeric.hasOwnProperty(p[0]))))) {
                nonGS1keyvaluePairs[p[0]]=this.percentDecode(p[1]);
            }
        }
    }

    let gs1AIarray=this.extractFromGS1digitalLink(digitalLinkURI).GS1;
    let compressedDL=this.buildCompressedGS1digitalLink(gs1AIarray,useShortText,uriStem,useOptimisations,compressOtherKeyValuePairs,nonGS1keyvaluePairs);
    return compressedDL;
}

app.get('/compression', function(req,res){
  if (this.uncompressedDigitalLinkInput !== "") {
    try {
      this.error3="";
      return gs1dlt.compressGS1DigitalLink(this.uncompressedDigitalLinkInput,(this.shortnames =="true"),this.uristem,(this.uncompressedPrimary=="true"),(this.useOptimisations=="true"),(this.compressOtherKeyValuePairs=="true"));
    } catch(err) {
      this.error3=err+"\n"+err.stack;
      return "";
    }


  } else {
    return "";
  }
})

module.exports = app;
