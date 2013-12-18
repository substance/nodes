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

  this.describeStructure = function() {
    var structure = [];
    var self = this;
    structure.push(
      this.propertyComponent("label")
      .element(function() {
        return self.childViews["label"].el;
      })
      .length(function() {
        return self.node.label.length;
      })
      .mapping(function(charPos) {
        return self.childViews.getDOMPosition(charPos);
      })
    );
    if (this.node.caption) {
      structure = structure.concat(this.childViews["caption"].describeStructure());
    }
    return structure;
  };

  // Updates image src when figure is updated by ImageUrlEditor
  // --------
  //
  // TODO: what to do if label is updated?

  this.onNodeUpdate = function(/*op*/) {
    // More efficient ?
    // Just update url
    this.$('img').attr({
      src: this.node.url
    });
    // Or re-render the whole thing to be safe?
    // this.render();
  };

};

FigureView.Prototype.prototype = NodeView.prototype;
FigureView.prototype = new FigureView.Prototype();

module.exports = FigureView;
