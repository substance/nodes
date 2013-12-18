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
};

Figure.Prototype.prototype = DocumentNode.prototype;
Figure.prototype = new Figure.Prototype();
Figure.prototype.constructor = Figure;

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

DocumentNode.defineProperties(Figure.prototype, ["url", "caption", "label"]);

Object.defineProperties(Figure.prototype, {
  // Used as a resource header
  header: {
    get: function() { return this.properties.label; }
  }
});

module.exports = Figure;
