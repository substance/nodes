"use strict";

var Issue = require('../issue/issue');

var Idea = function(node, document) {
  Issue.call(this, node, document);
};

// Type definition
// --------

Idea.type = {
  "id": "idea",
  "parent": "issue",
  "properties": {
  }
};

// This is used for the auto-generated docs
// -----------------
//

Idea.description = {
  "name": "Idea",
  "remarks": [
    "References a range in a text-ish node and tags it as emphasized"
  ],
  "properties": {
  }
};


// Example Idea annotation
// -----------------
//

Idea.example = {
  "type": "idea",
  "id": "idea_1",
  "path": [
    "text_54",
    "content"
  ],
  "range": [
    85,
    95
  ]
};

Idea.Prototype = function() {};

Idea.Prototype.prototype = Issue.prototype;
Idea.prototype = new Idea.Prototype();
Idea.prototype.constructor = Idea;

module.exports = Idea;