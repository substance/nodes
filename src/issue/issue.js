"use strict";

var DocumentNode = require('../node/node');

var Issue = function(node, document) {
  DocumentNode.call(this, node, document);
};

// Type definition
// --------

Issue.type = {
  "id": "issue",
  "properties": {
    "title": "string",
    "description": "string", // should be a reference to a text node?
    "creator": "string",
    "created_at": "date" // should be date
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
    "title": "Issue Title",
    "description": "More verbose issue description",
    "creator": "Issue creator",
    "created_at": "Date and time of issue creation."
  }
};


// Example Issue annotation
// -----------------
//

Issue.example = {
  "abstract": "type"
};

Issue.Prototype = function() {

  this.hasDescription = function() {
    return (!!this.properties.caption);
  };

  this.getDescription = function() {
    if (this.properties.description) return this.document.get(this.properties.description);
  };

  this.getReferences = function() {
    var references = this.document.indexes['references'];
    if (references) {
      return references.get(this.properties.id);
    } else {
      console.error("No index for references.")
      return [];
    }
  };

};

Issue.Prototype.prototype = DocumentNode.prototype;
Issue.prototype = new Issue.Prototype();
Issue.prototype.constructor = Issue;

Issue.prototype.defineProperties();

module.exports = Issue;
