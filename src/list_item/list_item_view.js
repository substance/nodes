"use strict";

var TextView = require("../text/text_view");
var _ = require("underscore");
var $$ = require("substance-application").$$;

// Substance.Image.View
// ==========================================================================

var ListItemView = function(node, viewFactory) {
  TextView.call(this, node);
  this.$el.addClass("list-item");
  // remove the content-node class as this is not a top-level node
  // and adding a data-path instead.
  // TODO: it feels like the class 'content-node' is not an appropriate name
  // maybe we should introduce an extra class for surface traversal (e.g. path lookup)
  this.$el.removeClass('content-node');
  this.$el.attr('data-path', node.id);

  this._level = this.node.level;
  this.$el.addClass('level-'+this._level);
};

ListItemView.Prototype = function() {
  var __super__ = TextView.prototype;

  this.render = function() {
    __super__.render.call(this);

    var bulletEl = $$(".bullet", {contenteditable: false});
    this.el.insertBefore(bulletEl, this.el.firstChild)

    return this;
  }

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
