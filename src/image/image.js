"use strict";

var DocumentNode = require('../node/node');

// var WebResource = require("../web_resource/web_resource");

var ImageNode = function(node, document) {
  DocumentNode.call(this, node, document);
};

// Type definition
// -----------------
//

ImageNode.type = {
  "id": "image",
  "parent": "content",
  "properties": {
    "source_id": "string",
    "url": "string"
  }
};

// This is used for the auto-generated docs
// -----------------
//


ImageNode.description = {
  "name": "Image",
  "remarks": [
    "Represents an image web resource."
  ],
  "properties": {
    "url": "URL to a resource",
  }
};


// Example Image
// -----------------
//

ImageNode.example = {
  "type": "image",
  "id": "image_1",
  "url": "http://substance.io/image_1.png"
};

ImageNode.Prototype = function() {};

ImageNode.Prototype.prototype = DocumentNode.prototype;
ImageNode.prototype = new ImageNode.Prototype();
ImageNode.prototype.constructor = ImageNode;

ImageNode.prototype.defineProperties();

module.exports = ImageNode;
