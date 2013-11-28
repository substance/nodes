"use strict";

var CompositeView = require("../composite/composite_view");
var $$ = require ("substance-application").$$;
var TextView = require("../text/text_view");

// Substance.Figure.View
// ==========================================================================

var FigureView = function(node, viewFactory) {
  CompositeView.call(this, node, viewFactory);
};

FigureView.Prototype = function() {

  // Rendering
  // =============================
  //

  this.render = function() {
    this.el.innerHTML = "";
    this.content = $$('div.content');

    var i;
    // dispose existing children views if called multiple times
    for (i = 0; i < this.childrenViews.length; i++) {
      this.childrenViews[i].dispose();
    }

    this.labelView = new TextView(this.node, this.viewFactory, {property: "label"});
    this.content.appendChild(this.labelView.render().el);
    this.childrenViews.push(this.labelView);

    // Add graphic (img element)
    var imgEl = $$('.image-wrapper', {
      children: [ $$("img", {src: this.node.url}) ]
    });

    this.content.appendChild(imgEl);


    var caption = this.node.getCaption();
    if (caption) {
      var captionView = this.viewFactory.createView(caption);
      var captionEl = captionView.render().el;
      captionEl.classList.add('caption');
      this.content.appendChild(captionEl);
      this.childrenViews.push(captionView);
    }

    this.el.appendChild(this.content);
    return this;
  };
};

FigureView.Prototype.prototype = CompositeView.prototype;
FigureView.prototype = new FigureView.Prototype();

module.exports = FigureView;
