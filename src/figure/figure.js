"use strict";

var DocumentNode = require("../node/node");

var Figure = function(node, document) {
  DocumentNode.call(this, node, document);
};

Figure.type = {
  "id": "figure",
  "parent": "content",
  "properties": {
    "url": "string",
    "image": "blob",
    "label": "string",
    "caption": "paragraph"
  }
};

Figure.description = {
  "name": "Figure",
  "remarks": [
    "A figure is a figure is figure."
  ],
  "properties": {
    "label": "Figure label (e.g. Figure 1)",
    "url": "Image url",
    "image": "Blob id that has the image data",
    "caption": "A reference to a paragraph that describes the figure",
  }
};

// Example Figure
// -----------------
//

Figure.example = {
  "id": "figure_1",
  "label": "Figure 1",
  "url": "http://example.com/fig1.png",
  "image": "",
  "caption": "paragraph_1"
};

Figure.config = {
  "zoomable": true
};

Figure.Prototype = function() {

  this.hasCaption = function() {
    return (!!this.properties.caption);
  };

  this.getCaption = function() {
    if (this.properties.caption) return this.document.get(this.properties.caption);
  };

  this.getBlob = function() {
    return this.document.getBlob(this.properties.image);
  };

  // Depending on wheter there is a blob it returns either the blob url or a regular image url
  // --------
  // 

  this.getUrl = function() {
    var blob = this.getBlob();
    if (blob) {
      return window.URL.createObjectURL(blob);
    } else {
      return this.properties.url;
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
    type: "figure",
    label: data.label,
    url: data.url
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
