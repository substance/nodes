"use strict";

var CompositeView = require("../composite/composite_view");

// Substance.Image.View
// ==========================================================================

var ParagraphView = function(node, viewFactory) {
  CompositeView.call(this, node, viewFactory);
};

ParagraphView.Prototype = function() {

  this.onNodeUpdate = function(op) {
    if (op.path[0] === this.node.id && op.path[1] === "children") {
      this.render();
    }
  };
};

ParagraphView.Prototype.prototype = CompositeView.prototype;
ParagraphView.prototype = new ParagraphView.Prototype();

module.exports = ParagraphView;
