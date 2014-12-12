"use strict";

var DocumentNode = require('../node/node');
var _ = require('underscore');

var MultiAnnotation = function(node, document) {
  DocumentNode.call(this, node, document);
};

// Type definition
// --------

MultiAnnotation.type = {
  "id": "annotation",
  "properties": {
    "startPath": ["array", "string"],
    "startPos": "number",
    "endPath": ["array", "string"],
    "endPos": "number"
  }
};

MultiAnnotation.Prototype = function() {
};

MultiAnnotation.Prototype.prototype = DocumentNode.prototype;
MultiAnnotation.prototype = new MultiAnnotation.Prototype();
MultiAnnotation.prototype.constructor = MultiAnnotation;

MultiAnnotation.prototype.defineProperties();

module.exports = MultiAnnotation;
