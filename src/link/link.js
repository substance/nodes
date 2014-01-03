"use strict";

var Annotation = require('../annotation/annotation');

var Link = function(node, document) {
  Annotation.call(this, node, document);
};

// Type definition
// --------

Link.type = {
  "id": "link",
  "parent": "annotation",
  "properties": {
    "url": "string"
  }
};


// This is used for the auto-generated docs
// -----------------
//

Link.description = {
  "name": "Link",
  "remarks": [
    "References a range in a text-ish node and tags it as subscript"
  ],
  "properties": {
  }
};


// Example Link annotation
// -----------------
//

Link.example = {
  "type": "link_1",
  "id": "link_1",
  "path": [
    "text_54",
    "content"
  ],
  "range": [
    85,
    95
  ]
};

Link.Prototype = function() {};

Link.Prototype.prototype = Annotation.prototype;
Link.prototype = new Link.Prototype();
Link.prototype.constructor = Link;

Link.prototype.defineProperties();

module.exports = Link;
