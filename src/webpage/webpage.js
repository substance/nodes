"use strict";

var DocumentNode = require('../node/node');

var Webpage = function(node, document) {
  DocumentNode.call(this, node, document);
};

// Type definition
// --------

Webpage.type = {
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

Webpage.description = {
  "name": "Webpage",
  "remarks": [
    "A webpage"
  ],
  "properties": {
    // "title": "Webpage Title",
    "description": "More verbose webpage description, if available",
    "url": "Webpage URL"
  }
};


// Example Webpage annotation
// -----------------
//

Webpage.example = {
  "abstract": "type"
};

Webpage.Prototype = function() {

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

Webpage.Prototype.prototype = DocumentNode.prototype;
Webpage.prototype = new Webpage.Prototype();
Webpage.prototype.constructor = Webpage;

Webpage.prototype.defineProperties();

module.exports = Webpage;
