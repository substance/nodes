"use strict";

var _ = require("underscore");

var DocumentNode = require("../node/node");

var Paragraph = function(node, document) {
  DocumentNode.call(this, node, document);
};

Paragraph.type = {
  "id": "paragraph",
  "parent": "content",
  "properties": {
    "children": ["array", "content"]
  }
};

// This is used for the auto-generated docs
// -----------------
//

Paragraph.description = {
  "name": "Paragraph",
  "remarks": [
    "A Paragraph can have inline elements such as images."
  ],
  "properties": {
    "children": "An array of content node references",
  }
};

// Example
// -------
//

Paragraph.example = {
  "type": "paragraph",
  "id": "paragraph_1",
  "children ": [
    "text_1",
    "image_1",
    "text_2"
  ]
};

Paragraph.Prototype = function() {

  this.getChildren = function() {
    return _.map(this.properties.children, function(id) {
      return this.document.get(id);
    }, this);
  };

};

Paragraph.Prototype.prototype = DocumentNode.prototype;
Paragraph.prototype = new Paragraph.Prototype();
Paragraph.prototype.constructor = Paragraph;

Paragraph.prototype.defineProperties();

module.exports = Paragraph;
