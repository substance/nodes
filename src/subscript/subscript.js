"use strict";

var Annotation = require('../annotation/annotation');

var Subscript = function(node, document) {
  Annotation.call(this, node, document);
};

// Type definition
// --------

Subscript.type = {
  "id": "subscript",
  "parent": "annotation",
  "properties": {
  }
};


// This is used for the auto-generated docs
// -----------------
//

Subscript.description = {
  "name": "Subscript",
  "remarks": [
    "References a range in a text-ish node and tags it as subscript"
  ],
  "properties": {
  }
};


// Example Subscript annotation
// -----------------
//

Subscript.example = {
  "type": "subscript",
  "id": "subscript_1",
  "path": [
    "text_54",
    "content"
  ],
  "range": [
    85,
    95
  ]
};

Subscript.Prototype = function() {};

Subscript.Prototype.prototype = Annotation.prototype;
Subscript.prototype = new Subscript.Prototype();
Subscript.prototype.constructor = Subscript;

module.exports = Subscript;
