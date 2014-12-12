"use strict";

var Annotation = require('../annotation/annotation');

var SubjectReference = function(node, document) {
  Annotation.call(this, node, document);
};

// Type definition
// --------

SubjectReference.type = {
  "id": "subject_reference",
  "parent": "annotation",
  "properties": {
    "target": "string"
  }
};

SubjectReference.Prototype = function() {};

SubjectReference.Prototype.prototype = Annotation.prototype;
SubjectReference.prototype = new SubjectReference.Prototype();
SubjectReference.prototype.constructor = SubjectReference;

SubjectReference.prototype.defineProperties();

module.exports = SubjectReference;
