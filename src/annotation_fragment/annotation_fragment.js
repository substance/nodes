"use strict";

var Annotation = require('../annotation/annotation');

var AnnotationFragment = function(node, document) {
  Annotation.call(this, node, document);
};

AnnotationFragment.type = {
  "id": "annotation_fragment",
  "parent": "annotation",
  "properties": {
    "annotation_id": "string",
    "fragment_number": "number"
  }
};

AnnotationFragment.Prototype = function() {
  // internal nodes do not get serialized
  this.isInternal = true;

  this.isFirst = function() {
    return this.properties.fragment_number === 0;
  };

  this.isLast = function() {
    return this.properties.fragment_number === this.getAnnotation().numberOfFragments - 1;
  };

  this.getAnnotation = function() {
    if (!this.annotation) {
      this.annotation = this.document.get(this.annotation_id);
    }
    return this.annotation;
  };
};

AnnotationFragment.Prototype.prototype = Annotation.prototype;
AnnotationFragment.prototype = new AnnotationFragment.Prototype();
AnnotationFragment.prototype.constructor = AnnotationFragment;

AnnotationFragment.prototype.defineProperties();

module.exports = AnnotationFragment;
