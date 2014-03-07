"use strict";

var DocumentNode = require("../node/node");

var BlockReference = function(node, document) {
  DocumentNode.call(this, node, document);
};

// Type definition
// --------

BlockReference.type = {
  "id": "block_reference",
  "properties": {
    "target": "figure"
  }
};


// This is used for the auto-generated docs
// -----------------
//

BlockReference.description = {
  "name": "BlockReference",
  "remarks": [
    "References a resource"
  ],
  "properties": {
    "target": "Referenced node id"
  }
};

// Example BlockReference
// -----------------
//

BlockReference.example = {
  "type": "block_reference_1",
  "id": "block_reference_1"
};


BlockReference.Prototype = function() {

  this.getResource = function() {
    return this.document.get(this.target);
  };

};


BlockReference.Prototype.prototype = DocumentNode.prototype;
BlockReference.prototype = new BlockReference.Prototype();
BlockReference.prototype.constructor = BlockReference;

BlockReference.prototype.defineProperties();

module.exports = BlockReference;
