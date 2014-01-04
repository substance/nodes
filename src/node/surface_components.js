"use strict";

var _ = require("underscore");

var __createRange__ = function(el) {
  var range = document.createRange();
  range.selectNode(el);
  return range;
};

var AbstractComponent = function(surface) {
  this.surface = surface;
  this.node = surface.node;
  this.path = null;
  this.__range__ = null;
};

AbstractComponent.Prototype = function() {
  this.getRange = function() {
    if (!this.__range__) {
      this.__range__ = __createRange__(this.getElement());
    }
    return this.__range__;
  };

  this.element = function(f) {
    this.__getElement__ = f;
    return this;
  };

  this.length = function(f) {
    this.__getLength__ = f;
    return this;
  };

  this.mapping = function(f) {
    this.__mapCharPos__ = f;
    return this;
  };

  this.getElement = function() {
    if (!this.el) {
      this.el = this.__getElement__.call(this);
      if (!this.el) {
        throw new Error("You tried to access a component which has not been rendered!");
      }
    }
    return this.el;
  };

  this.__getElement__ = function() {
    throw new Error("This method is abstract and must be overridden");
  };

  this.getLength = function() {
    return this.__getLength__.call(this);
  };

  this.__getLength__ = function() {
    throw new Error("This is abstract and must be overridden");
  };

  this.mapCharPos = function(charPos) {
    return this.__mapCharPos__.call(this, charPos);
  };

  this.__mapCharPos__ = function() {
    throw new Error("This method is abstract and must be overridden");
  };

};
AbstractComponent.prototype = new AbstractComponent.Prototype();

var PropertyComponent = function(surface, property, propertyPath) {
  AbstractComponent.call(this, surface);
  this.type = "property";
  this.path = [surface.node.id, property];
  this.propertyPath = propertyPath || this.path;
};
PropertyComponent.Prototype = function() {};
PropertyComponent.Prototype.prototype = AbstractComponent.prototype;
PropertyComponent.prototype = new PropertyComponent.Prototype();

var CustomComponent = function(surface, path, data) {
  AbstractComponent.call(this, surface);
  this.type = "custom";
  if (_.isString(path)) {
    path = [surface.node.id, path];
  }
  this.path = path;
  _.extend(this, data);
};
CustomComponent.Prototype = function() {};
CustomComponent.Prototype.prototype = AbstractComponent.prototype;
CustomComponent.prototype = new CustomComponent.Prototype();

module.exports = {
  PropertyComponent: PropertyComponent,
  CustomComponent: CustomComponent
};
