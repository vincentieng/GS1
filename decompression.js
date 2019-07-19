var gs = require('./gs1');

module.exports = {
  decompressGS1DigitalLink: function(compressedDigitalLinkURI) {
    var useShortText="";
      gs1 = new gs.gsclass();
      gs1.myfunction();
      let extracted = gs1.extractFromCompressedGS1digitalLink(compressedDigitalLinkURI);
      let gs1AIarray = extracted.GS1;
      let otherArray = extracted.other;
      console.log("OK");
      let uriStem="http://example.org";

      // TODO do something with otherArray to add it to the URI query string
      let uncompressedDL = gs1.buildGS1digitalLink(gs1AIarray,useShortText,uriStem,otherArray);
      // return uncompressedDL;
      return uncompressedDL ;
  }
};

//http://example.org/DgnYUc1gmji3NU0IREGFDTK2LJm
