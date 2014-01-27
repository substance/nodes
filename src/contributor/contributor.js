var _ = require('underscore');
var DocumentNode = require('../node/node');

// Substance.Contributor
// -----------------
//

var Contributor = function(node, doc) {
  DocumentNode.call(this, node, doc);
};


// Type definition
// -----------------
//

Contributor.type = {
  "id": "contributor",
  "parent": "content",
  "properties": {
    "source_id": "string",
    "name": "string", // full author name
    "role": "string",
    "organization": "string",
    "image": "string", // optional
    "email": "string",
    "contribution": "string"
  }
};

// This is used for the auto-generated docs
// -----------------
//

Contributor.description = {
  "name": "Contributor",
  "remarks": [
    "Describes an article contributor such as an author or editor.",
  ],
  "properties": {
    "name": "Full name.",
  }
};

// Example Video
// -----------------
//

Contributor.example = {
  "id": "contributor_1",
  "type": "contributor",
  "role": "author",
  "name": "John Doe",
  "image": "http://john.com/doe.png",
  "email": "a@b.com",
  "contribution": "Revising the article, data cleanup"
};


Contributor.Prototype = function() {
  this.getAffiliations = function() {
    return _.map(this.properties.affiliations, function(affId) {
      return this.document.get(affId);
    }, this);
  };
};

Contributor.Prototype.prototype = DocumentNode.prototype;
Contributor.prototype = new Contributor.Prototype();
Contributor.prototype.constructor = Contributor;

Contributor.prototype.defineProperties();

// Property aliases
// ----

Object.defineProperties(Contributor.prototype, {
  "header": {
    get: function() { return this.properties.name; },
    set: function() { throw new Error("This is a read-only alias property."); }
  }
});

module.exports = Contributor;