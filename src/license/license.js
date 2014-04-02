"use strict";

var DocumentNode = require('../node/node');
var _ = require('underscore');

var License = function(node, document) {
  DocumentNode.call(this, node, document);
};

// Type definition
// --------

License.type = {
  "id": "license",
  "properties": {
    "name": "string",
    "code": "string",
    "version": "string",
    "description": "string",
    "url": "string"
  }
};

// This is used for the auto-generated docs
// -----------------
//

License.description = {
  "name": "License",
  "remarks": [
    "Describes the content license used by the document"
  ],
  "properties": {
    "name": "License name",
    "code": "Coded license name, e.g. cc-by",
    "version": "License version",
    "description": "Text describing the license",
    "url": "URL for more information about the license"
  }
};


License.Prototype = function() {


};

License.available_licenses = {
  "none": {
    "id": "license",
    "type": "license",
    "name": "None",
    "code": "none",
    "description": "No license",
    "version": "1.0",
    "url": ""
  },
  "cc-by": {
    "id": "license",
    "type": "license",
    "name": "Creative Commons Attribution License",
    "code": "cc-by",
    "version": "3.0",
    "description": "This article is distributed under the terms of the Creative Commons Attribution License, which permits unrestricted use and redistribution provided that the original author and source are credited.",
    "url": "http://creativecommons.org/licenses/by/3.0/us/"
  }
};

License.Prototype.prototype = DocumentNode.prototype;
License.prototype = new License.Prototype();
License.prototype.constructor = License;

License.prototype.defineProperties();

module.exports = License;
