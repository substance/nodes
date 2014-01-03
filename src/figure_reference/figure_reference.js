"use strict";

var Annotation = require('../annotation/annotation');

var FigureReference = function(node, document) {
  Annotation.call(this, node, document);
};

// Type definition
// --------

FigureReference.type = {
  "id": "figure_reference",
  "parent": "annotation",
  "properties": {
    "target": "figure"
  }
};

// This is used for the auto-generated docs
// -----------------
//

FigureReference.description = {
  "name": "FigureReference",
  "remarks": [
    "References a range in a text-ish node and references a figure"
  ],
  "properties": {
    "target": "Referenced figure id"
  }
};


// Example FigureReference annotation
// -----------------
//

FigureReference.example = {
  "type": "figure_reference_1",
  "id": "figure_reference_1",
  "path": [
    "text_54",
    "content"
  ],
  "range": [
    85,
    95
  ]
};

FigureReference.Prototype = function() {};

FigureReference.Prototype.prototype = Annotation.prototype;
FigureReference.prototype = new FigureReference.Prototype();
FigureReference.prototype.constructor = FigureReference;

FigureReference.prototype.defineProperties();

module.exports = FigureReference;
