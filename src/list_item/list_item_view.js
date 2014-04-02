"use strict";

var TextView = require("../text/text_view");
var _ = require("underscore");
var $$ = require("substance-application").$$;

// Substance.Image.View
// ==========================================================================

var ListItemView = function(node, viewFactory) {
  TextView.call(this, node);

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
    __super__.dispose.call(this);
  };

};

ListItemView.Prototype.prototype = TextView.prototype;
ListItemView.prototype = new ListItemView.Prototype();

module.exports = ListItemView;
