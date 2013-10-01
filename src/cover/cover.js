var _ = require('underscore');
var DocumentNode = require('../node/node');

// Lens.Cover
// -----------------
//

var Cover = function(node, doc) {
  DocumentNode.call(this, node, doc);
};

// Type definition
// -----------------
//

Cover.type = {
  "id": "cover",
  "parent": "content",
  "properties": {
    "source_id": "string",
    "authors": ["array", "person_reference"]
  }
};


// This is used for the auto-generated docs
// -----------------
//

Cover.description = {
  "name": "Cover",
  "remarks": [
    "Virtual view on the title and authors of the paper."
  ],
  "properties": {
    "authors": "An array of references to collaborators"
  }
};

// Example Cover
// -----------------
//

Cover.example = {
  "id": "cover",
  "type": "cover",
  "authors": ["collaborator_reference_1", "collaborator_reference_2"]
};

Cover.Prototype = function() {
  this.getAuthorRefs = function() {
    return _.map(this.properties.authors, function(id) {
      return this.document.get(id);
    }, this);
  };
};

Cover.Prototype.prototype = DocumentNode.prototype;
Cover.prototype = new Cover.Prototype();
Cover.prototype.constructor = Cover;

// Generate getters
// --------

Object.defineProperties(Cover.prototype, {
  title: {
    get: function() {
      return this.document.title;
    }
  },
  authors: {
    // Expand author id's to corresponding person nodes
    get: function() {
      return this.properties.authors;
    }
  }
});

module.exports = Cover;
