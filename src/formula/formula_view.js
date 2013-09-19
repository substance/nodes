"use strict";

var NodeView = require('../node').View;

// FormulaView
// ===========

var FormulaView = function(node) {
  NodeView.call(this, node);

  this.$el.attr({id: node.id});
  this.$el.addClass('content-node formula');
  if (this.node.inline) {
    this.$el.addClass('inline');
  }
};

FormulaView.Prototype = function() {

  this.render = function() {

    // Render the formula
    // --------
    if (this.node.format === "mathml") {
      this.$el.html(this.node.data);
    } else if (this.node.format === "image") {
      this.$el.append('<img src="'+this.node.url+'"/>');
    }

    // Add label to block formula
    // --------
    if (this.node.label) {
      this.$el.append($('<div class="label">').html(this.node.label));
    }

    return this;
  };
};

FormulaView.Prototype.prototype = NodeView.prototype;
FormulaView.prototype = new FormulaView.Prototype();

module.exports = FormulaView;
