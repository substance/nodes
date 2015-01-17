var _ = require('underscore');
var AbstractNode = require('../node/node');

// DocumentNode
// -----------------
//

var DocumentNode = function(node, doc) {
  AbstractNode.call(this, node, doc);
};

// Type definition
// -----------------
//

DocumentNode.type = {
  "id": "document",
  "parent": "content",
  "properties": {
    "views": ["array", "view"],
    "guid": "string",
    "creator": "string",
    "authors": ["array", "contributor"],
    "project": "string",
    "location": "string",
    "place": "place",
    "duration": "string",
    "license": "license",
    "title": "string",
    "timemarks": "object",
    "abstract": "string",
    "abstract_en": "string", // english abstract
    "created_at": "date",
    "updated_at": "date",
    "published_on": "date", // should be part of the main type?
    "meta": "object"
  }
};


// This is used for the auto-generated docs
// -----------------
//

DocumentNode.description = {
  "name": "document",
  "remarks": [
    "A node containing meta information for a document."
  ],
  "properties": {
  }
};

// Example DocumentNode
// -----------------
//

DocumentNode.example = {
};

DocumentNode.Prototype = function() {
};

DocumentNode.Prototype.prototype = AbstractNode.prototype;
DocumentNode.prototype = new DocumentNode.Prototype();
DocumentNode.prototype.constructor = DocumentNode;

DocumentNode.prototype.defineProperties();


module.exports = DocumentNode;
