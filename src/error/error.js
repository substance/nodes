"use strict";

var Issue = require('../issue/issue');

var Error = function(node, document) {
  Issue.call(this, node, document);
};

// Type definition
// --------

Error.type = {
  "id": "error",
  "parent": "issue",
  "properties": {
  }
};


// This is used for the auto-generated docs
// -----------------
//

Error.description = {
  "name": "Error",
  "remarks": [
    "References a range in a text-ish node and tags it as emphasized"
  ],
  "properties": {
  }
};


// Example Error annotation
// -----------------
//

Error.example = {
  "type": "error",
  "id": "error_1",
  "path": [
    "text_54",
    "content"
  ],
  "range": [
    85,
    95
  ]
};

Error.Prototype = function() {};

Error.Prototype.prototype = Issue.prototype;
Error.prototype = new Error.Prototype();
Error.prototype.constructor = Error;

module.exports = Error;