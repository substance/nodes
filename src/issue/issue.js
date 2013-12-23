"use strict";

var Annotation = require('../annotation/annotation');

var Issue = function(node, document) {
  Annotation.call(this, node, document);
};

// Type definition
// --------

Issue.type = {
  "id": "issue",
  "parent": "annotation",
  "properties": {
  }
};


// This is used for the auto-generated docs
// -----------------
//

Issue.description = {
  "name": "Issue",
  "remarks": [
    "References a range in a text-ish node and tags it as subscript"
  ],
  "properties": {
  }
};


// Example Issue annotation
// -----------------
//

Issue.example = {
  "type": "issue_1",
  "id": "issue_1",
  "path": [
    "text_54",
    "content"
  ],
  "range": [
    85,
    95
  ]
};

Issue.Prototype = function() {};

Issue.Prototype.prototype = Annotation.prototype;
Issue.prototype = new Issue.Prototype();
Issue.prototype.constructor = Issue;

module.exports = Issue;
