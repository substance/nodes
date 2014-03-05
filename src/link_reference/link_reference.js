"use strict";

var Annotation = require('../annotation/annotation');

var LinkReference = function(node, document) {
  Annotation.call(this, node, document);
};

// Type definition
// --------

LinkReference.type = {
  "id": "link_reference",
  "parent": "annotation",
  "properties": {
    "target": "link"
  }
};


// This is used for the auto-generated docs
// -----------------
//

LinkReference.description = {
  "name": "LinkReference",
  "remarks": [
    "Refers to range in a text-ish node and assigns a link object"
  ],
  "properties": {
  }
};


// Example LinkReference annotation
// -----------------
//

LinkReference.example = {
  "type": "link_1",
  "id": "link_1",
  "path": [
    "text_54",
    "content"
  ],
  "range": [
    85,
    95
  ]
};


LinkReference.Prototype = function() {};

LinkReference.Prototype.prototype = Annotation.prototype;
LinkReference.prototype = new LinkReference.Prototype();
LinkReference.prototype.constructor = LinkReference;

LinkReference.prototype.defineProperties();

module.exports = LinkReference;
