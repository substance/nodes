"use strict";

var Annotation = require('../annotation/annotation');
var _ = require('underscore');


var CitationReference = function(node, document) {
  Annotation.call(this, node, document);
};

// Type definition
// --------

CitationReference.type = {
  "id": "citation_reference",
  "parent": "annotation",
  "properties": {
    "target": "citation"
  }
};


// This is used for the auto-generated docs
// -----------------
//

CitationReference.description = {
  "name": "CitationReference",
  "remarks": [
    "References a range in a text-ish node and references a citation."
  ],
  "properties": {
  }
};


// Example CitationReference annotation
// -----------------
//

CitationReference.example = {
  "type": "citation_reference_1",
  "id": "citation_reference_1",
  "path": [
    "text_54",
    "content"
  ],
  "range": [
    85,
    95
  ]
};

CitationReference.Prototype = function() {};

CitationReference.Prototype.prototype = Annotation.prototype;
CitationReference.prototype = new CitationReference.Prototype();


var getters = {};

_.each(CitationReference.type.properties, function(prop, key) {
  getters[key] = {
    get: function() {
      return this.properties[key];
    },
    set: function(value) {
      this.properties[key] = value;
      return this;
    }
  };
});

Object.defineProperties(CitationReference.prototype, getters);


CitationReference.prototype.constructor = CitationReference;
module.exports = CitationReference;
