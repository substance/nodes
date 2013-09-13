"use strict";

var TextView = require('../text/text_view');

// Substance.Heading.View
// ==========================================================================

var HeadingView = function(node) {
  TextView.call(this, node);

  this.$el.addClass('heading');
  this.$el.addClass('level-'+this.node.level);

};

HeadingView.Prototype = function() {};

HeadingView.Prototype.prototype = TextView.prototype;
HeadingView.prototype = new HeadingView.Prototype();

module.exports = HeadingView;
