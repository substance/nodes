"use strict";

var DocumentNode = require("../node/node");

var Figure = function(node, document) {
  DocumentNode.call(this, node, document);
};

Figure.type = {
  "id": "figure",
  "parent": "content",
  "properties": {
    "image": "file",
    "caption": "paragraph"
  }
};

Figure.description = {
  "name": "Figure",
  "remarks": [
    "A figure holding an image, a label and a caption."
  ],
  "properties": {
    "image": "File id that has the image data",
    "caption": "A reference to a paragraph that describes the figure",
  }
};

// Example Figure
// -----------------
//

Figure.example = {
  "id": "figure_1",
  "image": "figure_1.png",
  "caption": "paragraph_1"
};

Figure.Prototype = function() {

  this.deleteImage = function() {
    // Delete image file
    this.document.delete(this.properties.image);
    this.document.set([this.id, "image"], "");
  };

  this.hasCaption = function() {
    return (!!this.properties.caption);
  };

  this.getCaption = function() {
    if (this.properties.caption) return this.document.get(this.properties.caption);
  };

  this.getBlob = function() {
    if (!this.properties.image) return null;
    var file = this.document.get(this.properties.image);
    if (!file) return null;
    return file.getBlob();
  };

  // Depending on wheter there is a blob it returns either the blob url or a regular image url
  // --------
  //

  this.getUrl = function() {
    var blob = this.getBlob();
    if (blob) {
      // FIXME: fix Safari support. First we must use window.webkitURL instead
      // Secondly, the Blob does not work the same as in Chrom.
      var URL = window.URL;
      return URL.createObjectURL(blob);
    } else {
      return this.properties.image_url;
    }
  };
};

Figure.Prototype.prototype = DocumentNode.prototype;
Figure.prototype = new Figure.Prototype();
Figure.prototype.constructor = Figure;

Figure.prototype.defineProperties();

// Property aliases:
// ----

Object.defineProperties(Figure.prototype, {
  // Used as a resource header
  header: {
    get: function() { return this.properties.label; },
    set: function() { throw new Error("This is a read-only alias property."); }
  }
});

// a factory method to create nodes more conveniently
// Supported
//  - id: unique id
//  - url: a relative path or a web URL
//  - caption: a string used as caption
Figure.create = function(data) {

  var result = {};

  var figId = data.id;
  var figure = {
    id: figId,
    type: "figure"
  };

  if (data.caption) {
    var captionId = "caption_" + data.id;
    var caption = {
      id: captionId,
      type: "text",
      content: data.caption
    };
    result[captionId] = caption;
    figure.caption = captionId;
  }

  result[figId] = figure;
  return result;
};

module.exports = Figure;
