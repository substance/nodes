"use strict";

var Annotation = require('../annotation/annotation');

var ErrorReference = function(node, document) {
  Annotation.call(this, node, document);
};

// Type definition
// --------

ErrorReference.type = {
  "id": "error_reference",
  "parent": "annotation",
  "properties": {
    "target": "error"
  }
};

// This is used for the auto-generated docs
// -----------------
//

ErrorReference.description = {
  "name": "ErrorReference",
  "remarks": [
    "References a range in a text-ish node and references an error"
  ],
  "properties": {
    "target": "Referenced error id"
  }
};


// Example ErrorReference annotation
// -----------------
//

ErrorReference.example = {
  "type": "error_reference_1",
  "id": "error_reference_1",
  "path": [
    "text_54",
    "content"
  ],
  "range": [
    85,
    95
  ],
  "target": "error_1"
};

ErrorReference.Prototype = function() {};

ErrorReference.Prototype.prototype = Annotation.prototype;
ErrorReference.prototype = new ErrorReference.Prototype();
ErrorReference.prototype.constructor = ErrorReference;

ErrorReference.prototype.defineProperties();

module.exports = ErrorReference;
