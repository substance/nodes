"use strict";

var $$ = require ("substance-application").$$;
var NodeView = require("../node/node_view");
var TextView = require("../text/text_view");

// Substance.Figure.View
// ==========================================================================

var FigureView = function(node, viewFactory) {
  NodeView.call(this, node, viewFactory);
};


FigureView.Prototype = function() {

  // Rendering
  // =============================
  //

  this.render = function() {
    NodeView.prototype.render.call(this);

    this.labelView = new TextView(this.node, this.viewFactory, {property: "label"});
    $(this.labelView.el).addClass('toggle-resource');
    this.content.appendChild(this.labelView.render().el);

    // Resource body
    // --------
    //
    // Wraps all resource details

    var bodyEl = $$('.resource-body');

    // Prepares blobs etc. for the image
    var url = this.node.image || this.node.image_url;
    
    // Add graphic (img element)
    this.imgWrapper = $$('.image-wrapper', {
      children: [
        $$("a", {
          href: url,
          title: "View image in full size",
          target: "_blank",
          children: [$$('img', {src: url})]
        })
      ]
    });

    bodyEl.appendChild(this.imgWrapper);

    var caption = this.node.getCaption();
    if (caption) {
      this.captionView = this.viewFactory.createView(caption);
      var captionEl = this.captionView.render().el;
      captionEl.classList.add('caption');
      bodyEl.appendChild(captionEl);
    }

    this.content.appendChild(bodyEl);
    return this;
  };

  this.dispose = function() {
    NodeView.dispose.call(this);
    this.labelView.dispose();
    if (this.captionView) this.captionView.dispose();
  };

  // Updates image src when figure is updated by ImageUrlEditor
  // --------
  //

  this.onNodeUpdate = function(op) {
    this.updateImage();
    this.labelView.onNodeUpdate(op);
  };

};

FigureView.Prototype.prototype = NodeView.prototype;
FigureView.prototype = new FigureView.Prototype();

module.exports = FigureView;
