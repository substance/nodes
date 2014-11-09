"use strict";

var Annotation = require('../annotation/annotation');

var DefinitionReference = function(node, document) {
  Annotation.call(this, node, document);
};

// Type definition
// --------

DefinitionReference.type = {
  "id": "definition_reference",
  "parent": "annotation",
  "properties": {
    "target": "string"
  }
};

// This is used for the auto-generated docs
// -----------------
//

DefinitionReference.description = {
  "name": "DefinitionReference",
  "remarks": [
    "References a range in a text-ish node and references a location node."
  ],
  "properties": {
  }
};


// Example DefinitionReference annotation
// -----------------
//

DefinitionReference.example = {
  "id": "definition_reference_1",
  "type": "definition_reference",
  "path": [
    "text_54",
    "content"
  ],
  "range": [
    85,
    95
  ]
};

DefinitionReference.Prototype = function() {};

DefinitionReference.Prototype.prototype = Annotation.prototype;
DefinitionReference.prototype = new DefinitionReference.Prototype();
DefinitionReference.prototype.constructor = DefinitionReference;

DefinitionReference.prototype.defineProperties();

module.exports = DefinitionReference;
