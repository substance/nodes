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
    "version": "number",
    "content_type": "string" // content mime type
  }
};


File.description = {
  "name": "File",
  "remarks": [
    "A file is a file is a file."
  ],
  "properties": {
    "content_type": "Content MIME type",
    "version": "File version, gets incremented every time the file content changes."
  }
};

// Example File
// -----------------
//

File.example = {
  "id": "figure1.png",
  "version": 1,
  "content_type": "image/png"
};


File.Prototype = function() {

  this.isText = function() {
    return _.include(["application/json", "text/css", "text/plain", "text/html"], this.properties.content_type);
  };

  this.isBinary = function() {
    return !this.isText();
  };

  this.isJSON = function() {
    return this.properties.content_type === "application/json";
  };

  this.getData = function(version) {
    var dataKey = this.properties.id+".v"+(version || this.properties.version);
    return this.document.fileData[dataKey];
  };

  this.getBlob = function(version) {
    var data = this.getData(version);
    return new window.Blob([data], {type: this.properties.content_type});
  };

  // Assigns a data object from the temporary data store
  this.updateData = function(data) {
    var version = this.properties.version;

    // Version is set and no record exists in doc.fileData
    if (version && !this.getData(version)) {
      // Initialize = silent data update without triggering a version bump
    } else {
      version = version ? version + 1 : 1;
    }

    var dataKey = this.properties.id+".v"+version;

    // First create the data in our temporary data store
    if (this.isJSON()) {
      this.document.fileData[dataKey] = JSON.parse(data);
    } if(this.isText()) {
      this.document.fileData[dataKey] = data;
    } else { // Binary data
      this.document.fileData[dataKey] = data; // new Blob([data], {type: this.properties.content_type});
    }

    if (version !== this.properties.version) {
      // FigureView / ContributorView is listening to this operation
      this.document.set([this.properties.id, "version"], version);  
    }
  };

};

File.Prototype.prototype = DocumentNode.prototype;
File.prototype = new File.Prototype();
File.prototype.constructor = File;

File.prototype.defineProperties();

module.exports = File;