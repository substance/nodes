"use strict";

var NodeSurface = require("../node/node_surface");
var TextSurface = require("../text/text_surface");

var __titleComponent;
var __authorRefComponent;

var CoverSurface = function(node, surfaceProvider) {
  NodeSurface.call(this, node, surfaceProvider);

  this.components.push(__titleComponent(this));
};

CoverSurface.prototype = NodeSurface.prototype;

__titleComponent = function(self) {
  // TODO: it is not very convenient to create a Text sub-surface for a textish property:
  var titleSurface = new TextSurface(self.node, self.surfaceProvider, { property: "title", propertyPath: ["document", "title"]});
  var titleComponent = titleSurface.components[0];
  titleComponent.element(function() {
    return self.view.childViews["title"].el;
  });
  titleComponent.length(function() {
    // HACK: somehow we need a plus one here... dunno
    return self.node.title.length + 1;
  });
  return titleComponent;
};

module.exports = CoverSurface;
