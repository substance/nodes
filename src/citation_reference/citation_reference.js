"use strict";

var Annotation = require('../annotation/annotation');

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
CitationReference.prototype.constructor = CitationReference;

CitationReference.prototype.defineProperties();

module.exports = CitationReference;
