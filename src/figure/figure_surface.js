"use strict";

var NodeSurface = require("../node/node_surface");
var TextSurface = require("../text/text_surface");
var SurfaceComponents = require("../node/surface_components");

var __labelComponent;

var FigureSurface = function(node, surfaceProvider) {
  NodeSurface.call(this, node, surfaceProvider);

  this.components.push(__labelComponent(this));

  // TODO: it is not clear right now how to create a full-fledged node surface
  // which is registered with appropriate path (e.g., ["figure_1", "caption"])
  // we want to create a full node component, but need to adjust the path property
  if (this.node.caption) {
    var caption = this.node.getCaption();
    var captionSurface = this.surfaceProvider.getNodeSurface(caption);
    this.addSubSurface(captionSurface);
  }
};
FigureSurface.prototype = NodeSurface.prototype;

__labelComponent = function(self) {
  // TODO: it is not very convenient to create a Text sub-surface for a textish property:

  var labelSurface = new TextSurface(self.node, self.surfaceProvider, { property: "label"} );
  var labelComponent = labelSurface.components[0];
  labelComponent.element(function() {
      return self.view.childViews["label"].el;
    })
    .length(function() {
      // HACK: somehow we need a plus one here... dunno
      return self.node.label.length;
    });

  return labelComponent;
};

module.exports = FigureSurface;
