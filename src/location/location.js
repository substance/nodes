"use strict";

var DocumentNode = require('../node/node');

var Location = function(node, document) {
  DocumentNode.call(this, node, document);
};

// Type definition
// --------

Location.type = {
  "id": "location",
  "properties": {
    "name": "string",
    "synonyms": ["array", "string"], // should be a reference to a text node?
    "country": "string",
    "latlong": ["array", "number"],
    "comment": "string"
  }
};

// This is used for the auto-generated docs
// -----------------
//

Location.description = {
  "name": "Location",
  "remarks": [
    "A Location"
  ],
  "properties": {
    "name": "Location name",
    "synonyms": "List of synonyms for that location",
    "country": "Country of that location",
    "latlong": "Geo coordinates of that location",
    "comment": "Comment on that location"
  }
};


// Example Location node
// -----------------
//

Location.example = {};

Location.Prototype = function() {

  // this.hasDescription = function() {
  //   return (!!this.properties.caption);
  // };

  // this.getDescription = function() {
  //   if (this.properties.description) return this.document.get(this.properties.description);
  // };

  this.getReferences = function() {
    var references = this.document.getIndex('references');
    if (references) {
      return references.get(this.properties.id);
    } else {
      console.error("No index for references.")
      return [];
    }
  };
};

Location.Prototype.prototype = DocumentNode.prototype;
Location.prototype = new Location.Prototype();
Location.prototype.constructor = Location;

Location.prototype.defineProperties();

module.exports = Location;
