"use strict";

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

  }
};

// Example Cover
// -----------------
//

Cover.example = {
  "id": "cover",
  "type": "cover",
  "image": "http://example.com/image.png"
};

Cover.Prototype = function() {
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
