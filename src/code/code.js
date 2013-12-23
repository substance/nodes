"use strict";

var Annotation = require('../annotation/annotation');

var Code = function(node, document) {
  Annotation.call(this, node, document);
};

// Type definition
// --------

Code.type = {
  "id": "code",
  "parent": "annotation",
  "properties": {
  }
};


// This is used for the auto-generated docs
// -----------------
//

Code.description = {
  "name": "Code",
  "remarks": [
    "References a range in a text-ish node and tags it as subscript"
  ],
  "properties": {
  }
};


// Example Code annotation
// -----------------
//

Code.example = {
  "type": "code_1",
  "id": "code_1",
  "path": [
    "text_54",
    "content"
  ],
  "range": [
    85,
    95
  ]
};

Code.Prototype = function() {};

Code.Prototype.prototype = Annotation.prototype;
Code.prototype = new Code.Prototype();
Code.prototype.constructor = Code;

module.exports = Code;
