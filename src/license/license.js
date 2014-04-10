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
    "description": "No license is attached to this article.",
    "version": "1.0",
    "url": ""
  },
  "public-domain": {
    "id": "license",
    "type": "license",
    "name": "Public Domain",
    "code": "public-domain",
    "description": "This work has been identified as being free of known restrictions under copyright law, including all related and neighboring rights. You can copy, modify, distribute and perform the work, even for commercial purposes, all without asking permission.",
    "version": "1.0",
    "url": "http://creativecommons.org/publicdomain/mark/1.0/"
  },
  "cc-by": {
    "id": "license",
    "type": "license",
    "name": "Creative Commons Attribution License",
    "code": "cc-by",
    "version": "3.0",
    "description": "This article is distributed under the terms of the Creative Commons Attribution License, which permits unrestricted use and redistribution provided that the original author and source are credited.",
    "url": "http://creativecommons.org/licenses/by/3.0/us/"
  },
  "gutenberg": {
    "id": "license",
    "type": "license",
    "name": "Project Gutenberg License",
    "code": "gutenberg",
    "version": "1.0",
    "description": "This article is distributed under the terms of the Project Gutenberg License.",
    "url": "http://www.gutenberg.org/wiki/Gutenberg:The_Project_Gutenberg_License"
  }
};

License.Prototype.prototype = DocumentNode.prototype;
License.prototype = new License.Prototype();
License.prototype.constructor = License;

License.prototype.defineProperties();

module.exports = License;
