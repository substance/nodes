"use strict";

var DocumentNode = require('../node/node');

var MultiAnnotation = function(node, document) {
  DocumentNode.call(this, node, document);
  this.numberOfFragments = 0;
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
    this.numberOfFragments = end-start+1;
    for (var i = start; i <= end; i++) {
      var fragNumber = (i-start);
      var fragId = annotationId+"_"+fragNumber;
      // HACK: with our cloning via toJSON on transaction, this gets called too often
      // and we need to 'reuse' the existing fragment
      var frag = this.document.get(fragId);
      if (!frag) {
        var comp, startCharPos, endCharPos;
        startCharPos = 0;
        if (i === start) {
          comp = startComp;
          startCharPos = this.startCharPos;
          if (i === end) {
            endCharPos = this.endCharPos;
          } else {
            endCharPos = comp.getLength();
          }
        } else if ( i === end ) {
          comp = endComp;
          endCharPos = this.endCharPos;
        } else {
          comp = container.getComponent(i);
          endCharPos = comp.getLength();
        }
        var annotationFragment = {
          "type": "annotation_fragment",
          "id": fragId,
          "annotation_id": annotationId,
          "path": comp.path,
          "range": [startCharPos, endCharPos],
          "fragment_number": fragNumber
        };
        // HACK: we do not to track this change but having all listeners updated
        // Thus we use document.__apply__ instead of the convient Document API
        this.document.__apply__({ "type": "create", "path": [fragId], "val": annotationFragment });
      }
    }
  };

};

MultiAnnotation.Prototype.prototype = DocumentNode.prototype;
MultiAnnotation.prototype = new MultiAnnotation.Prototype();
MultiAnnotation.prototype.constructor = MultiAnnotation;

MultiAnnotation.prototype.defineProperties();

module.exports = MultiAnnotation;
