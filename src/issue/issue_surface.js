"use strict";

var NodeSurface = require("../node/node_surface");
var TextSurface = require("../text/text_surface");

var IssueSurface = function(node, surfaceProvider) {
  NodeSurface.call(this, node, surfaceProvider);

  this.components.push(TextSurface.textProperty(this, "title"));
  this.components.push(TextSurface.textProperty(this, "description"));
};

IssueSurface.Prototype = function() {
  var __super__ = NodeSurface.prototype;
  this.attachView = function(view) {
    __super__.attachView.call(this, view);
    this.labelComponent.surface.attachView(this.view.childViews["title"]);
    this.captionComponent.surface.attachView(this.view.childViews["description"]);
  };
};

IssueSurface.Prototype.prototype = NodeSurface.prototype;
IssueSurface.prototype = new IssueSurface.Prototype();

module.exports = IssueSurface;
