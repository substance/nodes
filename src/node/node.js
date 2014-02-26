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

  this.defineProperties = function(readonly) {
    if (!this.hasOwnProperty("constructor")) {
      throw new Error("Constructor property is not set. E.g.: MyNode.prototype.constructor = MyNode;");
    }
    var NodeClass = this.constructor;
    DocumentNode.defineAllProperties(NodeClass, readonly);
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

DocumentNode.defineAllProperties = function(NodeClass, readonly) {
  DocumentNode.defineProperties(NodeClass.prototype, Object.keys(NodeClass.type.properties), readonly);
};

DocumentNode.defineProperties(DocumentNode.prototype, ["id", "type"]);

module.exports = DocumentNode;
