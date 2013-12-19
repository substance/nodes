"use strict";

var NodeSurface = require("../node/node_surface");

var __labelComponent;

var FigureSurface = function(node, surfaceProvider) {
  NodeSurface.call(this, node, surfaceProvider);

  this.components.push(__labelComponent(this));

  if (this.node.caption) {
    this.addChildSurface(this.node.getCaption());
  }
};
FigureSurface.prototype = NodeSurface.prototype;

__labelComponent = function(self) {
  var component = self.propertyComponent("label")
    .element(function() {
      return self.childViews["label"].el;
    })
    .length(function() {
      return self.node.label.length;
    })
    .mapping(function(charPos) {
      return self.childViews["label"].getDOMPosition(charPos);
    });
  return component;
};

module.exports = FigureSurface;
