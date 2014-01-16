"use strict";

var NodeSurface = require("../node/node_surface");
var TextSurface = require("../text/text_surface");

var IssueSurface = function(node, surfaceProvider) {
  NodeSurface.call(this, node, surfaceProvider);

  this.components.push(this.titleComponent());
};

IssueSurface.Prototype = function() {

  this.titleComponent = function() {
    var self = this;
    // TODO: it is not very convenient to create a Text sub-surface for a textish property:
    var titleSurface = new TextSurface(this.node, this.surfaceProvider, { property: "title" });
    var titleComponent = titleSurface.components[0];
    titleComponent.element(function() {
        return self.view.childViews["title"].el;
      })
      .length(function() {
        // HACK: somehow we need a plus one here... dunno
        return self.node.title.length + 1;
      });
    titleComponent.name = "title";
    return titleComponent;
  };

};
IssueSurface.Prototype.prototype = NodeSurface.prototype;
IssueSurface.prototype = new IssueSurface.Prototype();

module.exports = IssueSurface;
