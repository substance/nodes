"use strict";

var DocumentNode = require('../node/node');

var Link = function(node, document) {
  DocumentNode.call(this, node, document);
};

// Type definition
// --------

Link.type = {
  "id": "issue",
  "properties": {
    // "title": "string",
    "description": "string", // should be a reference to a text node?
    "url": "string"
  }
};


// This is used for the auto-generated docs
// -----------------
//

Link.description = {
  "name": "Link",
  "remarks": [
    "A hyperlink"
  ],
  "properties": {
    // "title": "Link Title",
    "description": "More verbose link description, if available",
    "url": "Link URL"
  }
};


// Example Link annotation
// -----------------
//

Link.example = {
  "abstract": "type"
};

Link.Prototype = function() {

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

Link.Prototype.prototype = DocumentNode.prototype;
Link.prototype = new Link.Prototype();
Link.prototype.constructor = Link;

Link.prototype.defineProperties();

module.exports = Link;
