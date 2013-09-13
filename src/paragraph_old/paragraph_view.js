"use strict";

var TextView = require('../text/text_view');

// Substance.Paragraph.View
// ==========================================================================

var ParagraphView = function(node) {
  TextView.call(this, node);

  this.$el.addClass('content-node paragraph');
};

ParagraphView.Prototype = function() {};

ParagraphView.Prototype.prototype = TextView.prototype;
ParagraphView.prototype = new ParagraphView.Prototype();

module.exports = ParagraphView;
