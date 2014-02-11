"use strict";

var NodeSurface = require("../node/node_surface");
var TextSurface = require("../text/text_surface");
var SurfaceComponents = require("../node/surface_components");

var ContributorSurface = function(node, surfaceProvider) {
  NodeSurface.call(this, node, surfaceProvider);

  this.nameComponent = TextSurface.textProperty(this, "name");
  this.organizationComponent = TextSurface.textProperty(this, "organization");
  this.emailComponent = TextSurface.textProperty(this, "email");

  this.components.push(this.nameComponent);
  this.components.push(this.organizationComponent);
  this.components.push(this.emailComponent);

};

ContributorSurface.Prototype = function() {
  var __super__ = NodeSurface.prototype;

  this.attachView = function(view) {
    __super__.attachView.call(this, view);

    this.nameComponent.surface.attachView(this.view.childViews["name"]);
    this.organizationComponent.surface.attachView(this.view.childViews["organization"]);
    this.emailComponent.surface.attachView(this.view.childViews["email"]);
  };
};
ContributorSurface.Prototype.prototype = NodeSurface.prototype;
ContributorSurface.prototype = new ContributorSurface.Prototype();

module.exports = ContributorSurface;
