"use strict";

var Annotation = require('../annotation/annotation');

var Strong = function(node, document) {
  Annotation.call(this, node, document);
};

// Type definition
// --------

Strong.type = {
  "id": "strong",
  "parent": "annotation",
  "properties": {
  }
};


// This is used for the auto-generated docs
// -----------------
//

Strong.description = {
  "name": "Strong",
  "remarks": [
    "References a range in a text-ish node and tags it as strong emphasized"
  ],
  "properties": {
  }
};


// Example Strong annotation
// -----------------
//

Strong.example = {
  "type": "strong",
  "id": "strong_1",
  "path": [
    "text_54",
    "content"
  ],
  "range": [
    85,
    95
  ]
};

Strong.Prototype = function() {};

Strong.Prototype.prototype = Annotation.prototype;
Strong.prototype = new Strong.Prototype();
Strong.prototype.constructor = Strong;

module.exports = Strong;
