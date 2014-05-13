"use strict";

var DocumentNode = require('../node/node');

var ContainerNode = function(node, document) {
  DocumentNode.call(this, node, document);
};

// TODO: we should switch to 'container' soon
// as 'view' is too confusing in presence of Application.View
ContainerNode.type = {
  "id": "view",
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
