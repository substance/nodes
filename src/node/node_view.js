"use strict";

var View = require("substance-application").View;
var _ = require("underscore");

var __node_view_counter__ = 0;

var NodeView = function(node, viewFactory) {
  this.__id__ = __node_view_counter__++;

  View.call(this);

  this.node = node;
  this.viewFactory = viewFactory;

  this.$el.addClass('content-node').addClass(node.type.replace("_", "-"));
  this.$el.attr('id', this.node.id);
};

NodeView.Prototype = function() {

  // Rendering
  // --------
  //
  this.render = function() {
    // TODO: if we have a problem here currently
    // In ListView, it seems that the item views are disposed when rerendered,
    // but the new views are not connected properly
    this.disposeChildViews();

    this.el.innerHTML = "";
    this.content = window.document.createElement("DIV");
    this.content.classList.add("content");
    this.el.appendChild(this.content);
    return this;
  };

  this.dispose = function() {
    this.stopListening();
    this.disposeChildViews();
  };

  this.disposeChildViews = function() {
    if (this.childViews) {
      _.each(this.childViews, function(view) {
        if (view) view.dispose();
      });
    }
  };

  // A general graph update listener that dispatches
  // to `this.onNodeUpdate(op)`
  // --------
  //

  this.onGraphUpdate = function(op, target, options) {
    /* jshint unused:false */
    if(op.path[0] === this.node.id && (op.type === "update" || op.type === "set") ) {
      this.onNodeUpdate(op);
      return true;
    } else {
      return false;
    }
  };

  // Callback to get noticed about updates applied to the underlying node.
  // --------
  //

  this.onNodeUpdate = function(/*op*/) {
    // do nothing by default
  };

  this.onFocus = function() {
    console.log("focussed node view", this.__id__);
  };

  this.onBlur = function() {
    console.log("blurred node view", this.__id__);
  };
};

NodeView.Prototype.prototype = View.prototype;
NodeView.prototype = new NodeView.Prototype();

module.exports = NodeView;
