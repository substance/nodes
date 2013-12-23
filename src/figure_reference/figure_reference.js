"use strict";

var Annotation = require('../annotation/annotation');
var _ = require('underscore');

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


var getters = {};

_.each(FigureReference.type.properties, function(prop, key) {
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

Object.defineProperties(FigureReference.prototype, getters);

FigureReference.prototype.constructor = FigureReference;

module.exports = FigureReference;
