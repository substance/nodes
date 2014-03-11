"use strict";

var NodeView = require("../node/node_view");
var _ = require("underscore");
var $ = window.$;
var $$ = require("substance-application").$$;

// Substance.Image.View
// ==========================================================================

var ListView = function(node, viewFactory) {
  NodeView.call(this, node, viewFactory);

  this.el = node.ordered ? $$('ol') : $$('ul');
  this.$el = $(this.el);
  this.$el.addClass('content-node').addClass(node.type);
  this.$el.attr('id', this.node.id);

  this.childViews = {};
};

ListView.Prototype = function() {

  var __super__ = NodeView.prototype;

  this.render = function() {
    __super__.render.call(this);

    _.each(this.node.getItems(), function(item) {
      var itemView = this.viewFactory.createView(item, "overwrite");
      this.content.appendChild(itemView.render().el);
      this.childViews[item.id] = itemView;
    }, this);

    return this;
  };

  this.onNodeUpdate = function(op) {
    if (op.path[0] === this.node.id && op.path[1] === "items") {
      this.render();
    }
  };

  this.dispose = function() {
    __super__.dispose.call(this);
  };
};

ListView.Prototype.prototype = NodeView.prototype;
ListView.prototype = new ListView.Prototype();

module.exports = ListView;
