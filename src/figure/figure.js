"use strict";

var Document = require("substance-document");

var Figure = function(node, document) {
  Document.Composite.call(this, node, document);
};

Figure.type = {
  "parent": "content",
  "properties": {
    "url": "string",
    "label": "string",
    "caption": "paragraph"
  }
};

Figure.Prototype = function() {

  this.insertOperation = function(startChar, text) {
    return null;
  };

  this.deleteOperation = function(startChar, endChar) {
    return null;
  };

  this.hasCaption = function() {
    return (!!this.properties.caption);
  };

  this.getNodes = function() {
    var nodes = [];
    if (this.properties.caption) nodes.push(this.properties.caption);
    return nodes;
  };

  this.getCaption = function() {
    if (this.properties.caption) return this.document.get(this.properties.caption);
  };
};

Figure.Prototype.prototype = Document.Composite.prototype;
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

Document.Node.defineProperties(Figure.prototype, ["url", "caption"]);

Object.defineProperties(Figure.prototype, {
  // Used as a resource header
  header: {
    get: function() { return this.properties.label; }
  }
});

module.exports = Figure;
