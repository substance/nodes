"use strict";

var DocumentNode = require("../node/node");

var WebPage = function(node, document) {
  DocumentNode.call(this, node, document);
};

WebPage.type = {
  "id": "webpage",
  "parent": "content",
  "properties": {
    "file": "file",
    "width": "string",
    "height": "string",
    "caption": "paragraph"
  }
};

WebPage.description = {
  "name": "WebPage",
  "remarks": [
    "A webpage wraps an HTML site."
  ],
  "properties": {
    "file": "File id that has the html",
    "caption": "A reference to a paragraph that describes the figure",
  }
};

// Example WebPage
// -----------------
//

WebPage.example = {
  "id": "web_page",
  "label": "Webpage",
  "file": "web_page_1.html",
  "caption": "text_1"
};

WebPage.Prototype = function() {

  this.hasCaption = function() {
    return (!!this.properties.caption);
  };

  this.getCaption = function() {
    if (this.properties.caption) return this.document.get(this.properties.caption);
  };

  this.getHTML = function() {
    if (!this.properties.file) return "";
    var file = this.document.get(this.properties.file);
    if (!file) return "";
    return file.getData();
  };

  // this.getBlob = function() {
  //   if (!this.properties.file) return null;
  //   var file = this.document.get(this.properties.file);
  //   if (!file) return null;
  //   return file.getBlob();
  // };

  // Depending on wheter there is a blob it returns either the blob url or a regular image url
  // --------
  // 

  // this.getUrl = function() {
  //   var blob = this.getBlob();
  //   if (blob) {
  //     return window.URL.createObjectURL(blob);
  //   } else {
  //     return this.properties.image_url;
  //   }
  // };
};

WebPage.Prototype.prototype = DocumentNode.prototype;
WebPage.prototype = new WebPage.Prototype();
WebPage.prototype.constructor = WebPage;

WebPage.prototype.defineProperties();


module.exports = WebPage;
