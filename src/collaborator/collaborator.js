var _ = require('underscore');
var DocumentNode = require('../node/node');

// Substance.Collaborator
// -----------------
//

var Collaborator = function(node, doc) {
  DocumentNode.call(this, node, doc);
};


// Type definition
// -----------------
//

Collaborator.type = {
  "id": "collaborator",
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

Collaborator.description = {
  "name": "Collaborator",
  "remarks": [
    "Describes an article collaborator such as an author or editor.",
  ],
  "properties": {
    "name": "Full name.",
  }
};

// Example Video
// -----------------
//

Collaborator.example = {
  "id": "collaborator_1",
  "type": "collaborator",
  "role": "author",
  "name": "John Doe",
  "image": "http://john.com/doe.png",
  "email": "a@b.com",
  "contribution": "Revising the article, data cleanup"
};


Collaborator.Prototype = function() {
  this.getAffiliations = function() {
    return _.map(this.properties.affiliations, function(affId) {
      return this.document.get(affId);
    }, this);
  };
};

Collaborator.Prototype.prototype = DocumentNode.prototype;
Collaborator.prototype = new Collaborator.Prototype();
Collaborator.prototype.constructor = Collaborator;


// Generate getters
// --------

var getters = {};

var getters = {
  header: {
    get: function() {
      return this.properties.name;
    }
  }
};

_.each(Collaborator.type.properties, function(prop, key) {
  getters[key] = {
    get: function() {
      return this.properties[key];
    }
  };
});


Object.defineProperties(Collaborator.prototype, getters);
module.exports = Collaborator;
