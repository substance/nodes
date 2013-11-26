"use strict";

var TextView = require('../text/text_view');

// Substance.Heading.View
// ==========================================================================

var HeadingView = function(node) {
  TextView.call(this, node);
  this.$el.addClass('heading');

  this._level = this.node.level;
  this.$el.addClass('level-'+this._level);
};

HeadingView.Prototype = function() {
  var __super__ = TextView.prototype;

  this.onNodeUpdate = function(op) {
    __super__.onNodeUpdate.call(this, op);
    if (op.path[1] === "level") {
      this.$el.removeClass('level-'+this._level);

      this._level = this.node.level;
      this.$el.addClass('level-'+this._level);
    }
  };

};

HeadingView.Prototype.prototype = TextView.prototype;
HeadingView.prototype = new HeadingView.Prototype();

module.exports = HeadingView;
