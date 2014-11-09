"use strict";

var Annotation = require('../annotation/annotation');

var PersonReference = function(node, document) {
  Annotation.call(this, node, document);
};

// Type definition
// --------

PersonReference.type = {
  "id": "location_reference",
  "parent": "annotation",
  "properties": {
    "target": "string"
  }
};

// This is used for the auto-generated docs
// -----------------
//

PersonReference.description = {
  "name": "PersonReference",
  "remarks": [
    "References a range in a text-ish node and references a location node."
  ],
  "properties": {
  }
};


// Example PersonReference annotation
// -----------------
//

PersonReference.example = {
  "id": "person_reference_1",
  "type": "person_reference",
  "path": [
    "text_54",
    "content"
  ],
  "range": [
    85,
    95
  ]
};

PersonReference.Prototype = function() {};

PersonReference.Prototype.prototype = Annotation.prototype;
PersonReference.prototype = new PersonReference.Prototype();
PersonReference.prototype.constructor = PersonReference;

PersonReference.prototype.defineProperties();

module.exports = PersonReference;
