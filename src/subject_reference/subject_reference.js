"use strict";

var MultiAnnotation = require('../multi_annotation/multi_annotation');

var SubjectReference = function(node, document) {
  MultiAnnotation.call(this, node, document);
};

// Type definition
// --------

SubjectReference.type = {
  "id": "subject_reference",
  "parent": "multi_annotation",
  "properties": {
    "target": ["array", "string"]
  }
};

SubjectReference.Prototype = function() {};

SubjectReference.Prototype.prototype = MultiAnnotation.prototype;
SubjectReference.prototype = new SubjectReference.Prototype();
SubjectReference.prototype.constructor = SubjectReference;

SubjectReference.prototype.defineProperties();

module.exports = SubjectReference;
