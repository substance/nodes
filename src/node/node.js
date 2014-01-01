"use strict";

var _ = require("underscore");

// Substance.DocumentNode
// -----------------

var DocumentNode = function(node, document) {
  this.document = document;
  this.properties = node;
};

// Type definition
// --------
//

DocumentNode.type = {
  "parent": "content",
  "properties": {
  }
};

// Define node behavior
// --------
// These properties define the default behavior of a node, e.g., used when manipulating the document.
// Sub-types override these settings
// Note: it is quite experimental, and we will consolidate them soon.

DocumentNode.properties = {
  abstract: true,
  immutable: true,
  mergeableWith: [],
  preventEmpty: true,
  allowedAnnotations: []
};

DocumentNode.Prototype = function() {

  this.toJSON = function() {
    return _.clone(this.properties);
  };

  this.getAnnotations = function() {
    return this.document.getIndex("annotations").get(this.properties.id);
  };

  this.isInstanceOf = function(type) {
    var schema = this.document.getSchema();
    return schema.isInstanceOf(this.type, type);
  };
};

DocumentNode.prototype = new DocumentNode.Prototype();
DocumentNode.prototype.constructor = DocumentNode;

DocumentNode.defineProperties = function(NodePrototype, properties, readonly) {
  _.each(properties, function(name) {
    var spec = {
      get: function() {
        return this.properties[name];
      }
    };
    if (!readonly) {
      spec["set"] = function(val) {
        this.properties[name] = val;
        return this;
      };
    }
    Object.defineProperty(NodePrototype, name, spec);
  });
};

DocumentNode.defineProperties(DocumentNode.prototype, ["id", "type"]);

module.exports = DocumentNode;
