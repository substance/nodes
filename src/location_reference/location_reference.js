"use strict";

var Annotation = require('../annotation/annotation');

var LocationReference = function(node, document) {
  Annotation.call(this, node, document);
};

// Type definition
// --------

LocationReference.type = {
  "id": "location_reference",
  "parent": "annotation",
  "properties": {
    "target": "string"
  }
};

// This is used for the auto-generated docs
// -----------------
//

LocationReference.description = {
  "name": "LocationReference",
  "remarks": [
    "References a range in a text-ish node and references a location node."
  ],
  "properties": {
  }
};


// Example LocationReference annotation
// -----------------
//

LocationReference.example = {
  "type": "location_reference_1",
  "id": "location_reference_1",
  "path": [
    "text_54",
    "content"
  ],
  "range": [
    85,
    95
  ]
};

LocationReference.Prototype = function() {};

LocationReference.Prototype.prototype = Annotation.prototype;
LocationReference.prototype = new LocationReference.Prototype();
LocationReference.prototype.constructor = LocationReference;

LocationReference.prototype.defineProperties();

module.exports = LocationReference;
