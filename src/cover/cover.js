var _ = require('underscore');
var DocumentNode = require('../node/node');

// Cover
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
    "authors": ["array", "collaborator_reference"],
    "image": "string"
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

Cover.prototype.defineProperties();

// Property aliases
// --------

Object.defineProperties(Cover.prototype, {
  title: {
    get: function() {
      return this.document.title;
    },
    set: function() {
      throw new Error("This is a read-only property alias.");
    }
  }
});

module.exports = Cover;
