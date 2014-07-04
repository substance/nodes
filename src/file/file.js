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

  this.getSize = function() {
    var data = this.getData();
    if (this.isJSON()) {
      return JSON.stringify(data).length;
    } else if (this.isBinary()) {
      // Just making sure we don't run into a NaN scenario
      return data.byteLength || data.length || 0;
    } else {
      return data.length;
    }
  };

  this.getBlob = function(version) {
    var data = this.getData(version);
    return new window.Blob([data], {type: this.properties.content_type});
  };

  // Set the data for a given version
  // ------------
  // This is used to attach data to the file node for a specific version
  // If version is not given, the 'version' property is used
  //
  this.setData = function(data, version) {
    version = version || this.properties.version;

    var dataKey = this.properties.id+".v"+version;
    // First create the data in our temporary data store
    if (this.isJSON()) {
      this.document.fileData[dataKey] = JSON.parse(data);
    } else if (this.isText()) {
      this.document.fileData[dataKey] = data;
    } else { // Binary data
      this.document.fileData[dataKey] = data; // new Blob([data], {type: this.properties.content_type});
    }
  };

  // Assigns a data object from the temporary data store
  this.updateData = function(data) {
    var version = this.properties.version;
    version = version ? version + 1 : 1;
    this.setData(data, version);
    // Note: a node view displaying the file (e.g. figure) should listen to
    // this change
    this.document.set([this.properties.id, "version"], version);
  };
};



File.Prototype.prototype = DocumentNode.prototype;
File.prototype = new File.Prototype();
File.prototype.constructor = File;

File.prototype.defineProperties();

module.exports = File;