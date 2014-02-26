"use strict";

var Annotation = require('../annotation/annotation');

var Math = function(node, document) {
  Annotation.call(this, node, document);
};

// Type definition
// --------

Math.type = {
  "id": "math",
  "parent": "annotation",
  "properties": {
  }
};


// This is used for the auto-generated docs
// -----------------
//

Math.description = {
  "name": "Math",
  "remarks": [
    "References a range in a text-ish node and tags it as subscript"
  ],
  "properties": {
  }
};


// Example Math annotation
// -----------------
//

Math.example = {
  "type": "math_1",
  "id": "math_1",
  "path": [
    "text_54",
    "content"
  ],
  "range": [
    85,
    95
  ]
};

Math.Prototype = function() {};

Math.Prototype.prototype = Annotation.prototype;
Math.prototype = new Math.Prototype();
Math.prototype.constructor = Math;

module.exports = Math;
