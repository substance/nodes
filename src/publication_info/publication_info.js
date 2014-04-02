var _ = require('underscore');
var DocumentNode = require('../node/node');
var License = require("../license/license");

// Substance.PublicationInfo
// -----------------
//

var PublicationInfo = function(node, doc) {
  DocumentNode.call(this, node, doc);
};

// Type definition
// -----------------
//

PublicationInfo.type = {
  "id": "publication_info",
  "parent": "content",
  "properties": {

  }
};

// This is used for the auto-generated docs
// -----------------
//

PublicationInfo.description = {
  "name": "PublicationInfo",
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

PublicationInfo.example = {
  "id": "publication_info",
  "type": "publication_info",
  "description": "Revising the article, data cleanup"
};

PublicationInfo.Prototype = function() {

  this.getLicense = function() {
    var license = this.document.get('license');
    return license ? license.code : null;
  };

  this.setLicense = function(code) {
    this.document.delete("license");
    this.document.create(License.available_licenses[code]);
  };

};

PublicationInfo.Prototype.prototype = DocumentNode.prototype;
PublicationInfo.prototype = new PublicationInfo.Prototype();
PublicationInfo.prototype.constructor = PublicationInfo;

PublicationInfo.prototype.defineProperties();

// Property aliases
// ----


module.exports = PublicationInfo;
