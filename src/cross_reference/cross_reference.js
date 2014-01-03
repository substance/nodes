"use strict";

var Annotation = require('../annotation/annotation');

var CrossReference = function(node, document) {
  Annotation.call(this, node, document);
};

// Type definition
// --------

CrossReference.type = {
  "id": "cross_reference",
  "parent": "annotation",
  "properties": {
    "target": "content"
  }
};


// This is used for the auto-generated docs
// -----------------
//

CrossReference.description = {
  "name": "CrossReference",
  "remarks": [
    "References a range in a text-ish node and references a content node."
  ],
  "properties": {

  }
};


// Example CrossReference annotation
// -----------------
//

CrossReference.example = {
  "type": "cross_reference_1",
  "id": "cross_reference_1",
  "path": [
    "text_54",
    "content"
  ],
  "range": [
    85,
    95
  ]
};

CrossReference.Prototype = function() {};

CrossReference.Prototype.prototype = Annotation.prototype;
CrossReference.prototype = new CrossReference.Prototype();
CrossReference.prototype.constructor = CrossReference;

CrossReference.prototype.defineProperties();

module.exports = CrossReference;
