"use strict";

var NodeView = require("../node/node_view");

// Substance.Image.View
// ==========================================================================

var ParagraphView = function(node, viewFactory) {
  NodeView.call(this, node, viewFactory);
};

ParagraphView.Prototype = function() {

  this.render = function() {
    NodeView.prototype.render.call(this);
    // TODO
    return this;
  };

  this.onNodeUpdate = function(op) {
    if (op.path[0] === this.node.id && op.path[1] === "children") {
      this.render();
    }
  };
};

ParagraphView.Prototype.prototype = NodeView.prototype;
ParagraphView.prototype = new ParagraphView.Prototype();

module.exports = ParagraphView;
