"use strict";

var DocumentNode = require('../node/node');

var WebResource = function(node, document) {
  DocumentNode.call(this, node, document);
};

// Type definition
// --------

WebResource.type = {
  "id": "webresource",
  "properties": {
    "title": "string",
    "description": "string", // should be a reference to a text node?
    "url": "string"
  }
};

// This is used for the auto-generated docs
// -----------------
//

WebResource.description = {
  "name": "WebResource",
  "remarks": [
    "A WebResource"
  ],
  "properties": {
    "title": "Webpage title",
    "description": "More verbose WebResource description, if available",
    "url": "WebResource URL"
  }
};


// Example WebResource annotation
// -----------------
//

WebResource.example = {
  "abstract": "type"
};

WebResource.Prototype = function() {

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

WebResource.Prototype.prototype = DocumentNode.prototype;
WebResource.prototype = new WebResource.Prototype();
WebResource.prototype.constructor = WebResource;

WebResource.prototype.defineProperties();

module.exports = WebResource;
