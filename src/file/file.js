"use strict";

var DocumentNode = require("../node/node");
var _ = require("underscore");

var File = function(node, document) {
  DocumentNode.call(this, node, document);
};


File.type = {
  "id": "file",
  "parent": "content",
  "properties": {
    "data": "string", // either a blob reference or just a string for text files
    "content_type": "string" // content mime type
  }
};


File.description = {
  "name": "File",
  "remarks": [
    "A file is a file is a file."
  ],
  "properties": {
    "data": "A data reference",
    "content_type": "Content MIME type"
  }
};

// Example File
// -----------------
//

File.example = {
  "id": "figure1.png",
  "data": "figure1.png",
  "content_type": "image/png"
};


File.Prototype = function() {

  this.isText = function() {
    return _.include(["application/json", "text/css", "text/plain"], this.properties.content_type);
  };

  this.isBinary = function() {
    return !this.isText();
  };

  this.isJSON = function() {
    return this.properties.content_type === "application/json";
  };

  this.getData = function() {
    return this.document.fileData[this.properties.data];
  };

  // Assigns a data object from the temporary data store
  this.setData = function(data, dataKey) {
    // Data key defaults to File.id (which corresponds to the filename)
    dataKey = dataKey || this.properties.id;

    // First create the data in our temporary data store
    if (this.isJSON()) {
      this.document.fileData[dataKey] = JSON.parse(data);
    } else if (this.isText()) { // Text data
      this.document.fileData[dataKey] = data;
    } else { // Binary data
      this.document.fileData[dataKey] = new Blob([data], {type: this.properties.content_type});
    }

    // FigureView / ContributorView is listening to this event
    if (dataKey !== this.properties.data) {
      this.document.set([this.properties.id, "data"], dataKey);
    }
  };

};

File.Prototype.prototype = DocumentNode.prototype;
File.prototype = new File.Prototype();
File.prototype.constructor = File;

File.prototype.defineProperties();

module.exports = File;