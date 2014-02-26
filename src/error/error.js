"use strict";

var Issue = require('../issue/issue');

var ErrorNode = function(node, document) {
  Issue.call(this, node, document);
};

// Type definition
// --------

ErrorNode.type = {
  "id": "error",
  "parent": "issue",
  "properties": {
  }
};


// This is used for the auto-generated docs
// -----------------
//

ErrorNode.description = {
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

ErrorNode.example = {
  "type": "error",
  "id": "error_1",
  "title": "Hi I am an a error",
  "description": "An error, yes."
};

ErrorNode.Prototype = function() {};

ErrorNode.Prototype.prototype = Issue.prototype;
ErrorNode.prototype = new ErrorNode.Prototype();
ErrorNode.prototype.constructor = ErrorNode;

module.exports = ErrorNode;
