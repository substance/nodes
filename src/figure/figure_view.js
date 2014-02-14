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

    this.imgEl = $$("img", {href: "#"});

    // Prepares blobs etc. for the image

    // Add graphic (img element)
    this.imgWrapper = $$('.image-wrapper', {
      children: [
        $$("a", {
          href: "#",
          title: "View image in full size",
          target: "_blank",
          children: [this.imgEl]
        })
      ]
    });

    bodyEl.appendChild(this.imgWrapper);

    this.updateImage();

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

  this.updateImage = function() {
    var url = this.node.getUrl();
    this.imgEl.setAttribute("src", url);

    $(this.imgWrapper).find('a').attr({
      href: url
    });
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
