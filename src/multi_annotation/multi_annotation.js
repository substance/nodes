"use strict";

var DocumentNode = require('../node/node');
var util = require('substance-util');

var MultiAnnotation = function(node, document) {
  DocumentNode.call(this, node, document);
  this.addFragments();
};

// Type definition
// --------

MultiAnnotation.type = {
  "id": "annotation",
  "properties": {
    "container": "string",
    "startPath": ["array", "string"],
    "startCharPos": "number",
    "endPath": ["array", "string"],
    "endCharPos": "number"
  }
};

MultiAnnotation.Prototype = function() {

  this.addFragments = function() {
    var container = this.document.get(this.container);
    var annotationId = this.id;
    var startComp = container.lookup(this.startPath);
    var endComp = container.lookup(this.endPath);
    var start = startComp.pos;
    var end = endComp.pos;
    for (var i = start; i <= end; i++) {
      var comp, startCharPos, endCharPos;
      if (i === start) {
        comp = startComp;
        startCharPos = this.startCharPos;
        endCharPos = comp.getLength();
      } else if (i === end) {
        comp = endComp;
        startCharPos = 0;
        endCharPos = this.endCharPos;
      } else {
        comp = container.getComponent(i);
        startCharPos = 0;
        endCharPos = comp.getLength();
      }
      var annotationFragment = {
        "type": "annotation_fragment",
        "id": util.uuid('fragment_'),
        "annotation_id": annotationId,
        "path": comp.path,
        "range": [startCharPos, endCharPos]
      };
      this.document.create(annotationFragment);
    }
  };

};

MultiAnnotation.Prototype.prototype = DocumentNode.prototype;
MultiAnnotation.prototype = new MultiAnnotation.Prototype();
MultiAnnotation.prototype.constructor = MultiAnnotation;

MultiAnnotation.prototype.defineProperties();

module.exports = MultiAnnotation;
