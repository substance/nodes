"use strict";

var Annotation = require('../annotation/annotation');
var _ = require('underscore');

var Issue = function(node, document) {
  Annotation.call(this, node, document);
};

// Type definition
// --------

Issue.type = {
  "id": "issue",
  "parent": "annotation",
  "properties": {
    "title": "string",
    "issue_type": "string",
    "description": "string"
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
  "title": "Add high resolution images",
  "descr": "By adding high resolution images, this paper gains a lot of quality.",
  "issue_type": "idea",
  "range": [
    85,
    95
  ]
};

Issue.Prototype = function() {};

Issue.Prototype.prototype = Annotation.prototype;
Issue.prototype = new Issue.Prototype();

// Getters and setters
// -----------------
//

var getters = {};

_.each(Issue.type.properties, function(prop, key) {
  getters[key] = {
    get: function() {
      return this.properties[key];
    },
    set: function(value) {
      this.properties[key] = value;
      return this;
    }
  };
});

Object.defineProperties(Issue.prototype, getters);

Issue.prototype.constructor = Issue;

module.exports = Issue;
