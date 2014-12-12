"use strict";

var Annotation = require('../annotation/annotation');

var AnnotationFragment = function(node, document) {
  Annotation.call(this, node, document);
};

AnnotationFragment.type = {
  "id": "annotation_fragment",
  "parent": "annotation",
  "properties": {
    "annotation_id": "string"
  }
};

AnnotationFragment.Prototype = function() {};

AnnotationFragment.Prototype.prototype = Annotation.prototype;
AnnotationFragment.prototype = new AnnotationFragment.Prototype();
AnnotationFragment.prototype.constructor = AnnotationFragment;

AnnotationFragment.prototype.defineProperties();

module.exports = AnnotationFragment;
