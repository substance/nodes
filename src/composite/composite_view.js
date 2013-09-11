"use strict";

var NodeView = require("../node").View;

// Substance.Image.View
// ==========================================================================

var CompositeView = function(node, viewFactory) {
  NodeView.call(this, node, viewFactory);

  this.$el.addClass(node.type);
  this.$el.attr('id', this.node.id);

  this.childrenViews = [];
};

CompositeView.Prototype = function() {

  // Rendering
  // =============================
  //

  // Render Markup
  // --------
  //

  this.render = function() {
    this.content = document.createElement("DIV");
    this.content.classList.add("content");

    var i;

    // dispose existing children views if called multiple times
    for (i = 0; i < this.childrenViews.length; i++) {
      this.childrenViews[i].dispose();
    }

    // create children views
    var children = this.node.getNodes();
    for (i = 0; i < children.length; i++) {
      var child = this.node.document.get(children[i]);
      var childView = this.viewFactory.createView(child);
      this.content.appendChild(childView.render().el);
      this.childrenViews.push(childView);
    }

    this.el.appendChild(this.content);
    return this;
  };

  this.dispose = function() {
    NodeView.prototype.dispose.call(this);

    for (var i = 0; i < this.childrenViews.length; i++) {
      this.childrenViews[i].dispose();
    }
  };

  this.delete = function() {
  };

  this.getCharPosition = function(/*el, offset*/) {
    return 0;
  };

  this.getDOMPosition = function() {
    var content = this.$('.content')[0];
    var range = document.createRange();
    range.setStartBefore(content.childNodes[0]);
    return range;
  };
};

CompositeView.Prototype.prototype = NodeView.prototype;
CompositeView.prototype = new CompositeView.Prototype();

module.exports = CompositeView;
