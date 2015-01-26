"use strict";

var DocumentNode = require('../node/node');

var MultiAnnotation = function(node, document) {
  DocumentNode.call(this, node, document);
  this.numberOfFragments = 0;
  this.fragmentIds = [];
  // this.addFragments();
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

  this.removeFragments = function(tx) {
    var doc = tx ? tx.document : this.document;
    for (var i = 0; i < this.fragmentIds.length; i++) {
      var fragId = this.fragmentIds[i];
      var frag = doc.get(fragId);
      doc.apply({ "type": "delete", "path": [fragId], "val": frag });
    }
  };

  this.addFragments = function(tx) {
    var doc;
    if (tx) {
      doc = tx.document;
    } else {
      doc = this.document;
    }
    var container = doc.get(this.container);
    var annotationId = this.id;
    var startComp = container.lookup(this.startPath);
    var endComp = container.lookup(this.endPath);
    var start = startComp.pos;
    var end = endComp.pos;
    this.fragmentIds = [];
    this.numberOfFragments = end-start+1;
    for (var i = start; i <= end; i++) {
      var fragNumber = (i-start);
      var fragId = annotationId+"_"+fragNumber;
      // HACK: with our cloning via toJSON on transaction, this gets called too often
      // and we need to 'reuse' the existing fragment
      var frag = doc.get(fragId);
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
        doc.apply({ "type": "create", "path": [fragId], "val": annotationFragment });
      }
      this.fragmentIds.push(fragId);
    }
  };

  this.update = function(tx) {
    this.removeFragments(tx);
    this.addFragments(tx);
  };

};

MultiAnnotation.Prototype.prototype = DocumentNode.prototype;
MultiAnnotation.prototype = new MultiAnnotation.Prototype();
MultiAnnotation.prototype.constructor = MultiAnnotation;

MultiAnnotation.prototype.defineProperties();

module.exports = MultiAnnotation;
