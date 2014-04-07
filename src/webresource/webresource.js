"use strict";

var DocumentNode = require('../node/node');

var Webresource = function(node, document) {
  DocumentNode.call(this, node, document);
};

// Type definition
// --------

Webresource.type = {
  "id": "webresource",
  "properties": {
    "description": "string", // should be a reference to a text node?
    "url": "string"
  }
};

// This is used for the auto-generated docs
// -----------------
//

Webresource.description = {
  "name": "Webresource",
  "remarks": [
    "A Webresource"
  ],
  "properties": {
    "description": "More verbose Webresource description, if available",
    "url": "Webresource URL"
  }
};


// Example Webresource annotation
// -----------------
//

Webresource.example = {
  "abstract": "type"
};

Webresource.Prototype = function() {

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

Webresource.Prototype.prototype = DocumentNode.prototype;
Webresource.prototype = new Webresource.Prototype();
Webresource.prototype.constructor = Webresource;

Webresource.prototype.defineProperties();

module.exports = Webresource;
