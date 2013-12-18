"use strict";

var NodeView = require("../node/node_view");
// var List = require("./list");

// Substance.Image.View
// ==========================================================================

var ListView = function(node, viewFactory) {
  NodeView.call(this, node, viewFactory);
};

ListView.Prototype = function() {

  // Rendering
  // =============================
  //

  this.render = function() {
    NodeView.prototype.render.call(this);
    // TODO
    return this;
  };

  this.onNodeUpdate = function(op) {
    if (op.path[0] === this.node.id && op.path[1] === "items") {
      this.render();
    }
  };
};

ListView.Prototype.prototype = NodeView.prototype;
ListView.prototype = new ListView.Prototype();

module.exports = ListView;
