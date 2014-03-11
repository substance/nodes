"use strict";

var TextView = require("../text/text_view");
var $ = window.$;
var $$ = require("substance-application").$$;

// Substance.Image.View
// ==========================================================================

var ListItemView = function(node) {
  TextView.call(this, node);

  this.el = $$('li.list-item');
  this.$el = $(this.el);
  this.$el.attr('id', this.node.id);

  // Note: this element has no 'content-node' class as it is not a top-level node.
  // Instead it has a data-path.
  this.$el.attr('data-path', node.id);

  this._level = this.node.level;
  this.$el.addClass('level-'+this._level);
};

ListItemView.Prototype = function() {
  var __super__ = TextView.prototype;

  this.onNodeUpdate = function(op) {
    __super__.onNodeUpdate.call(this, op);
    if (op.path[1] === "level") {
      this.$el.removeClass('level-'+this._level);

      this._level = this.node.level;
      this.$el.addClass('level-'+this._level);
    }
  };

  this.dispose = function() {
    console.log("Disposing ListItemView...");
    __super__.dispose.call(this);
  };

};

ListItemView.Prototype.prototype = TextView.prototype;
ListItemView.prototype = new ListItemView.Prototype();

module.exports = ListItemView;
