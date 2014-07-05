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

  // TODO: We should discuss if it is really desirable to have document manipulation
  // in a model class
  // TODO: this should be transactional
  this.deleteImage = function() {
    // Delete image file
    this.document.delete(this.properties.image);
    this.document.set([this.id, "image"], "");
  };

  // TODO: Use File.getBlob() instead

  this.getBlob = function() {
    if (!this.properties.image) return null;
    var file = this.document.get(this.properties.image);
    if (!file) return null;
    return file.getBlob();
  };

  // Depending on wheter there is a blob it returns either the blob url or a regular image url
  // --------
  //

  this.getUrl = function() {
    var blob = this.getBlob();
    if (blob) {
      return window.URL.createObjectURL(blob);
    } else {
      return this.properties.image_url;
    }
  };

};

Cover.Prototype.prototype = DocumentNode.prototype;
Cover.prototype = new Cover.Prototype();
Cover.prototype.constructor = Cover;

Cover.prototype.defineProperties();

// Property aliases
// --------

Object.defineProperties(Cover.prototype, {
  "title": {
    get: function() {
      return this.document.title;
    },
    set: function(title) {
      this.document.title = title;
    }
  },
  "abstract": {
    get: function() {
      return this.document.abstract;
    },
    set: function(abstract) {
      this.document.abstract = abstract;
    }
  }
});

module.exports = Cover;
