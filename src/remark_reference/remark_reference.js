"use strict";

var Annotation = require('../annotation/annotation');

var RemarkReference = function(node, document) {
  Annotation.call(this, node, document);
};

// Type definition
// --------

RemarkReference.type = {
  "id": "remark_reference",
  "parent": "annotation",
  "properties": {
    "target": "remark"
  }
};

// This is used for the auto-generated docs
// -----------------
//

RemarkReference.description = {
  "name": "RemarkReference",
  "remarks": [
    "References a range in a text-ish node and references a remark"
  ],
  "properties": {
    "target": "Referenced remark id"
  }
};


// Example RemarkReference annotation
// -----------------
//

RemarkReference.example = {
  "type": "remark_reference_1",
  "id": "remark_reference_1",
  "path": [
    "text_54",
    "content"
  ],
  "range": [
    85,
    95
  ]
};

RemarkReference.Prototype = function() {};

RemarkReference.Prototype.prototype = Annotation.prototype;
RemarkReference.prototype = new RemarkReference.Prototype();
RemarkReference.prototype.constructor = RemarkReference;

RemarkReference.prototype.defineProperties();

module.exports = RemarkReference;
