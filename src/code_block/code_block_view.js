"use strict";

var TextView = require('../text/text_view');

// Substance.CodeBlock.View
// ==========================================================================

var CodeBlockView = function(node) {
  TextView.call(this, node);

  this.$el.addClass('content-node code-block');
};

CodeBlockView.Prototype = function() {};

CodeBlockView.Prototype.prototype = TextView.prototype;
CodeBlockView.prototype = new CodeBlockView.Prototype();

module.exports = CodeBlockView;
