"use strict";

var $$ = require ("substance-application").$$;
var NodeView = require("../node/node_view");
var TextView = require("../text/text_view");

// Substance.Figure.View
// ==========================================================================

var FigureView = function(node, viewFactory) {
  NodeView.call(this, node, viewFactory);

  this.childViews = {
    "label": null,
    "caption": null
  };
};

FigureView.Prototype = function() {

  // Rendering
  // =============================
  //

  this.render = function() {
    NodeView.prototype.render.call(this);

    var labelView = this.childViews["label"] = new TextView(this.node, this.viewFactory, {property: "label"});
    this.content.appendChild(labelView.render().el);

    // Add graphic (img element)
    var imgEl = $$('.image-wrapper', {
      children: [ $$("img", { src: this.node.url, title: "Edit image URL" }) ]
    });
    this.content.appendChild(imgEl);

    var caption = this.node.getCaption();
    if (caption) {
      var captionView = this.childViews["caption"] = this.viewFactory.createView(caption);
      var captionEl = captionView.render().el;
      captionEl.classList.add('caption');
      this.content.appendChild(captionEl);
    }

    return this;
  };

  // Updates image src when figure is updated by ImageUrlEditor
  // --------
  //
  // TODO: what to do if label is updated?

  this.onNodeUpdate = function(op) {
    this.$('img').attr({
      src: this.node.url
    });
    this.childViews["label"].onNodeUpdate(op);
  };

};

FigureView.Prototype.prototype = NodeView.prototype;
FigureView.prototype = new FigureView.Prototype();

module.exports = FigureView;
