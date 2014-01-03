"use strict";

var DocumentNode = require('../node/node');
var _ = require('underscore');

var Annotation = function(node, document) {
  DocumentNode.call(this, node, document);
};

// Type definition
// --------

Annotation.type = {
  "id": "annotation",
  "properties": {
    "path": ["array", "string"], // -> e.g. ["text_1", "content"]
    "range": "object"
  }
};


// This is used for the auto-generated docs
// -----------------
//

Annotation.description = {
  "name": "Annotation",
  "remarks": [
    "Abstract type for all available annotations"
  ],
  "properties": {
    "path": "References node and property in the graph.",
    "range": "Tuple describing start and end character offset."
  }
};


// Example Annotation
// -----------------
//

Annotation.example = {
  "type": "emphasis",
  "id": "emphasis_1",
  "path": [
    "text_54",
    "content"
  ],
  "range": [
    85,
    95
  ]
};

Annotation.Prototype = function() {
  this.getContent = function() {
    var content = this.document.get(this.path);
    var range = this.range;
    return content.substring(range[0], range[1]);
  };
};

Annotation.Prototype.prototype = DocumentNode.prototype;
Annotation.prototype = new Annotation.Prototype();
Annotation.prototype.constructor = Annotation;

Annotation.prototype.defineProperties();

module.exports = Annotation;
