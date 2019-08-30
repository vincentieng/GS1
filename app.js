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
var qrCode = require('./qrcode');
var router = express.Router();
var gs = require('./gs1');
const qr = require('qr-image');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

var cons = require('consolidate');
app.use(express.static('./files'))

// view engine setup
app.engine('html', cons.swig)
app.set('files', path.join(__dirname, 'files'));
app.set('view engine', 'html');

app.get('/', function(req,res){
  res.sendFile('index.html', {root: path.join(__dirname, './files')})
})

app.post('/compression', function(req,resp){ //Post Response
  var compression = req.body.compression;
  var compressedLink = compressFunction.compressedDigitalLink(compression);
  resp.render('../files/index', {compressedDigitalLink : compressedLink});
});


app.post('/decompression', function(req,resp){ //Post Response
  var decompression = req.body.decompression;
  var decompressedLink = uncompressFunction.decompressGS1DigitalLink(decompression)
  resp.render('../files/index', {uncompressedDigitalLinkOutput : decompressedLink});
});

app.post('/qrcode', (req, res, next) => {
    let qr_txt = req.body.qr_text;
    var qr_png = qr.imageSync(qr_txt,{ type: 'png'})
    let qr_code_file_name = new Date().getTime() + '.png';
    fs.writeFileSync('./files/qr/' + qr_code_file_name, qr_png, (err) => {
        if(err){
            console.log(err);
        }

    })
    res.send({
        'qr_img': "qr/" + qr_code_file_name
    });
});
app.listen(3000, function(){
  console.log("Server started on port 3000");
})





module.exports = app;
