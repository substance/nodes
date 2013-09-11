"use strict";

var CompositeView = require("../composite/composite_view");
var RichParagraph = require("./richparagraph");

// Substance.Image.View
// ==========================================================================

var RichParagraphView = function(node, viewFactory) {
  CompositeView.call(this, node, viewFactory);
};

RichParagraphView.Prototype = function() {

  this.onNodeUpdate = function(op) {
    if (op.path[0] === this.node.id && op.path[1] === "children") {
      this.render();
    }
  };
};

RichParagraphView.Prototype.prototype = CompositeView.prototype;
RichParagraphView.prototype = new RichParagraphView.Prototype();

module.exports = RichParagraphView;
