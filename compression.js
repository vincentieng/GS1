var gs = require('./gs1');

module.exports = {
  compressedDigitalLink : function(uncompressedDigitalLinkInput) {
    var shortnames = true;
    var uristem="http://example.org";
    var uncompressedPrimary = "true";
    var useOptimisations = "true";
    var compressOtherKeyValuePairs="true";


    if (uncompressedDigitalLinkInput != "") {
      try {
        this.error3="";
        gs1 = new gs.gsclass();
        return((gs1.compressGS1DigitalLink(uncompressedDigitalLinkInput,shortnames,uristem,uncompressedPrimary, useOptimisations, compressOtherKeyValuePairs))); 
        /*if((gs1.compressGS1DigitalLink(this.uncompressedDigitalLinkInput,(this.shortnames =="true"),this.uristem,(this.uncompressedPrimary=="true"),(this.useOptimisations=="true"),(this.compressOtherKeyValuePairs=="true"))) !== "")*/


      } catch(err) {
        this.error3=err+"\n"+err.stack;
        return "";
      }

    } else {
      return "";
    }


  },
};
