"use strict";

var Annotation = require('../annotation/annotation');

var Superscript = function(node, document) {
  Annotation.call(this, node, document);
};

// Type definition
// --------

Superscript.type = {
  "id": "superscript",
  "parent": "annotation",
  "properties": {
  }
};


// This is used for the auto-generated docs
// -----------------
//

Superscript.description = {
  "name": "Superscript",
  "remarks": [
    "References a range in a text-ish node and tags it as strong emphasized"
  ],
  "properties": {
  }
};


// Example Superscript annotation
// -----------------
//

Superscript.example = {
  "type": "strong",
  "id": "superscript_1",
  "path": [
    "text_54",
    "content"
  ],
  "range": [
    85,
    95
  ]
};


Superscript.Prototype = function() {};

Superscript.Prototype.prototype = Annotation.prototype;
Superscript.prototype = new Superscript.Prototype();
Superscript.prototype.constructor = Superscript;

module.exports = Superscript;
