"use strict";

var DocumentNode = require('../node/node');

var ContainerNode = function(node, document) {
  DocumentNode.call(this, node, document);
};

ContainerNode.type = {
  "id": "container",
  "properties": {
    "nodes": ["array", "content"]
  }
};

ContainerNode.Prototype = function() {};

ContainerNode.Prototype.prototype = DocumentNode.prototype;
ContainerNode.prototype = new ContainerNode.Prototype();
ContainerNode.prototype.constructor = ContainerNode;

ContainerNode.prototype.defineProperties();

module.exports = ContainerNode;
