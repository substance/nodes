"use strict";

var Annotation = require('../annotation/annotation');

var Emphasis = function(node, document) {
  Annotation.call(this, node, document);
};

// Type definition
// --------

Emphasis.type = {
  "id": "emphasis",
  "parent": "annotation",
  "properties": {
  }
};


// This is used for the auto-generated docs
// -----------------
//

Emphasis.description = {
  "name": "Emphasis",
  "remarks": [
    "References a range in a text-ish node and tags it as emphasized"
  ],
  "properties": {
  }
};


// Example Emphasis annotation
// -----------------
//

Emphasis.example = {
  "emphasis_1": {
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
  }
};

Emphasis.Prototype = function() {};

Emphasis.Prototype.prototype = Annotation.prototype;
Emphasis.prototype = new Emphasis.Prototype();
Emphasis.prototype.constructor = Emphasis;

module.exports = Emphasis;

