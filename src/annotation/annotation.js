"use strict";

var DocumentNode = require('../node/node');
var _ = require('underscore');

var Annotation = function(node, document) {
  DocumentNode.call(this, node, document);
};

// Type definition
// --------

Annotation.type = {
  "id": "annotation",
  "properties": {
    "path": ["array", "string"], // -> e.g. ["text_1", "content"]
    "range": "object"
  }
};


// This is used for the auto-generated docs
// -----------------
//

Annotation.description = {
  "name": "Annotation",
  "remarks": [
    "Abstract type for all available annotations"
  ],
  "properties": {
    "path": "References node and property in the graph.",
    "range": "Tuple describing start and end character offset."
  }
};


// Example Annotation
// -----------------
//

Annotation.example = {
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
};

Annotation.Prototype = function() {};

Annotation.Prototype.prototype = DocumentNode.prototype;
Annotation.prototype = new Annotation.Prototype();
Annotation.prototype.constructor = Annotation;


// Generate getters
// --------

var getters = {};


_.each(Annotation.type.properties, function(prop, key) {
  getters[key] = {
    get: function() {
      return this.properties[key];
    },
    set: function(value) {
      return this.properties[key] = value;
    }
  };
});


Object.defineProperties(Annotation.prototype, getters);

module.exports = Annotation;
