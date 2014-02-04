"use strict";

var NodeSurface = require("../node/node_surface");
var TextSurface = require("../text/text_surface");
var SurfaceComponents = require("../node/surface_components");

var ContributorSurface = function(node, surfaceProvider) {
  NodeSurface.call(this, node, surfaceProvider);

  this.nameComponent = TextSurface.textProperty(this, "name");
  this.components.push(this.nameComponent);

  // TODO: Add components for organization, etc.
};

ContributorSurface.Prototype = function() {
  var __super__ = NodeSurface.prototype;
  this.attachView = function(view) {
    __super__.attachView.call(this, view);


    this.nameComponent.surface.attachView(this.view.childViews["name"]);
    // this.captionComponent.surface.attachView(this.view.childViews["caption"]);
  };
};
ContributorSurface.Prototype.prototype = NodeSurface.prototype;
ContributorSurface.prototype = new ContributorSurface.Prototype();

module.exports = ContributorSurface;
