"use strict";

var DocumentNode = require('../node/node');

var MultiNodeAnnotation = function(node, document) {
  DocumentNode.call(this, node, document);
};

MultiNodeAnnotation.type = {
  "id": "MultiNodeAnnotation",
  "properties": {
    // multi-node annotations specify a range with respect to the components of a container
    "container": "string",
    // { path: [nodeId, componentName], charPos: number }
    "start": "object",
    "end": "object"
  }
};

MultiNodeAnnotation.Prototype = function() {
};

MultiNodeAnnotation.Prototype.prototype = DocumentNode.prototype;
MultiNodeAnnotation.prototype = new MultiNodeAnnotation.Prototype();
MultiNodeAnnotation.prototype.constructor = MultiNodeAnnotation;

MultiNodeAnnotation.prototype.defineProperties();

module.exports = MultiNodeAnnotation;
