"use strict";

var _ = require("underscore");

var __createRange__ = function(el) {
  var range = document.createRange();
  range.selectNode(el);
  return range;
};

var AbstractComponent = function(node, view, el, path) {
  this.node = node;
  this.view = view;
  this.path = path;
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
    return this.view.el;
  };

  this.getLength = function() {
    return this.__getLength__.call(this);
  };

  this.__getLength__ = function() {
    return this.node.getLength();
  };

  this.mapCharPos = function(charPos) {
    return this.__mapCharPos__.call(this, charPos);
  };

  this.__mapCharPos__ = function() {
    throw new Error("This method is abstract and must be overridden");
  };

};
AbstractComponent.prototype = new AbstractComponent.Prototype();

var NodeComponent = function(node, view) {
  AbstractComponent.call(this, node, view, view.el);
  this.type = "node";
  this.path = [node.id];
};
NodeComponent.Prototype = function() {
};
NodeComponent.Prototype.prototype = AbstractComponent.prototype;
NodeComponent.prototype = new NodeComponent.Prototype();

var PropertyComponent = function(node, view, property, propertyPath) {
  AbstractComponent.call(this, node, view);
  this.type = "property";
  this.path = [node.id, property];
  this.propertyPath = propertyPath || this.path;
};
PropertyComponent.Prototype = function() {
  this.__getLength__ = function() {
    throw new Error("This is abstract and must be overridden");
  };
};
PropertyComponent.Prototype.prototype = AbstractComponent.prototype;
PropertyComponent.prototype = new PropertyComponent.Prototype();

var CustomComponent = function(node, view, path, data) {
  AbstractComponent.call(this, node, view);
  this.type = "custom";
  if (_.isString(path)) {
    path = [node.id, path];
  }
  this.path = path;
  _.extend(this, data);
};
CustomComponent.Prototype = function() {
  this.__getLength__ = function() {
    throw new Error("This is abstract and must be overridden");
  };
};
CustomComponent.Prototype.prototype = AbstractComponent.prototype;
CustomComponent.prototype = new CustomComponent.Prototype();

module.exports = {
  NodeComponent: NodeComponent,
  PropertyComponent: PropertyComponent,
  CustomComponent: CustomComponent
};
