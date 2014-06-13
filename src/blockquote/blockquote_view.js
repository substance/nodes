"use strict";

var TextView = require('../text/text_view');

// Substance.Blockquote.View
// ==========================================================================

var BlockquoteView = function(node) {
  TextView.call(this, node);
  this.$el.addClass('blockquote');
};

BlockquoteView.Prototype = function() {
  var __super__ = TextView.prototype;

  this.onNodeUpdate = function(op) {
    __super__.onNodeUpdate.call(this, op);
  };
};

BlockquoteView.Prototype.prototype = TextView.prototype;
BlockquoteView.prototype = new BlockquoteView.Prototype();

module.exports = BlockquoteView;
