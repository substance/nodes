"use strict";

var Node = require('../node/node');

var BlobReference = function(node, document) {
  Node.call(this, node, document);
};

// Type definition
// --------

BlobReference.type = {
  "id": "blob_reference",
  "properties": {
    "path": ["array", "string"],
    "blob": "string"
  }
};

// This is used for the auto-generated docs
// -----------------
//

BlobReference.description = {
  "name": "BlobReference",
  "remarks": [
    "References a blob in the volatile blob store"
  ],
  "properties": {
    "path": "Referenced node/property",
    "blob": "Referenced blob id"
  }
};



BlobReference.Prototype = function() {};

BlobReference.Prototype.prototype = Node.prototype;
BlobReference.prototype = new BlobReference.Prototype();
BlobReference.prototype.constructor = BlobReference;

BlobReference.prototype.defineProperties();

module.exports = BlobReference;
