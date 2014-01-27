"use strict";

var NodeSurface = require("../node/node_surface");
var TextSurface = require("../text/text_surface");

var __titleComponent;
var __authorRefComponent;

var CoverSurface = function(node, surfaceProvider) {
  NodeSurface.call(this, node, surfaceProvider);

  this.titleComponent = TextSurface.textProperty(this, "title", ["document", "title"]);
  this.components.push(this.titleComponent);
};

CoverSurface.Prototype = function() {
  var __super__ = NodeSurface.prototype;
  this.attachView = function(view) {
    __super__.attachView.call(this, view);
    this.titleComponent.surface.attachView(this.view.childViews["title"]);
  };
};
CoverSurface.Prototype.prototype = NodeSurface.prototype;
CoverSurface.prototype = new CoverSurface.Prototype();

module.exports = CoverSurface;
