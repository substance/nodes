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
    $(labelView.el).addClass('toggle-resource');
    this.content.appendChild(labelView.render().el);

    // Delete Button
    // --------

    var deleteButton = $$('a.delete-resource', {
      href: '#',
      text: "Delete",
      contenteditable: false // Make sure this is not editable!
    });

    labelView.el.appendChild(deleteButton);

    // Resource body
    // --------
    //
    // Wraps all resource details

    var bodyEl = $$('.resource-body');

    // Add graphic (img element)
    var imgEl = $$('.image-wrapper', {
      children: [$$("a", {
        href: this.node.url,
        title: "View image in full size",
        target: "_blank",
        children: [$$("img", { src: this.node.url})]
      })]
    });

    bodyEl.appendChild(imgEl);

    var caption = this.node.getCaption();
    if (caption) {
      var captionView = this.childViews["caption"] = this.viewFactory.createView(caption);
      var captionEl = captionView.render().el;
      captionEl.classList.add('caption');
      bodyEl.appendChild(captionEl);
    }

    this.content.appendChild(bodyEl);
    return this;
  };

  // Updates image src when figure is updated by ImageUrlEditor
  // --------
  //

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
