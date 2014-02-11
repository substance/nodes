"use strict";

var _ = require("underscore");
var NodeSurface = require("../node/node_surface");
var TextSurface = require("../text/text_surface");
var SurfaceComponents = require("../node/surface_components");

var __labelComponent;

var FigureSurface = function(node, surfaceProvider) {
  NodeSurface.call(this, node, surfaceProvider);

  this.labelComponent = TextSurface.textProperty(this, "label");
  this.components.push(this.labelComponent);

  // TODO: it is not clear right now how to create a full-fledged node surface
  // which is registered with appropriate path (e.g., ["figure_1", "caption"])
  // we want to create a full node component, but need to adjust the path property
  if (this.node.caption) {
    var caption = this.node.getCaption();
    var captionSurface = this.surfaceProvider.getNodeSurface(caption);
    this.addSubSurface("caption", captionSurface);
  }
};
FigureSurface.Prototype = function() {
  var __super__ = NodeSurface.prototype;
  this.attachView = function(view) {
    __super__.attachView.call(this, view);
    this.labelComponent.surface.attachView(this.view.childViews["label"]);
    if (this.captionComponent) this.captionComponent.surface.attachView(this.view.childViews["caption"]);
  };
};
FigureSurface.Prototype.prototype = NodeSurface.prototype;
FigureSurface.prototype = new FigureSurface.Prototype();

module.exports = FigureSurface;
