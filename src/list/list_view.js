"use strict";

var NodeView = require("../node/node_view");
var _ = require("underscore");
var $$ = require("substance-application").$$;
// var List = require("./list");

// Substance.Image.View
// ==========================================================================

var ListView = function(node, viewFactory) {
  NodeView.call(this, node, viewFactory);

  this.childViews = {};
};

ListView.Prototype = function() {

  // Rendering
  // =============================
  //

  this.render = function() {
    NodeView.prototype.render.call(this);

    _.each(this.node.getItems(), function(item) {
      var itemView = this.childViews[item.id] = this.viewFactory.createView(item);
      $(itemView.el).addClass('list-item level-1');
      itemView.render();

      // Append bullet
      // TODO: Can we do better here?
      itemView.el.appendChild($$('.bullet'));
      this.content.appendChild(itemView.el);
    }, this);

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
