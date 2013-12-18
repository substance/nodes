"use strict";

var __createRange__ = function(el) {
  var range = document.createRange();
  range.selectNode(el);
  return range;
};

var AbstractComponent = function(node, view, el) {
  this.node = node;
  this.view = view;
  this.el = el;
  this.__range__ = null;
};
AbstractComponent.Prototype = function() {
  this.getRange = function() {
    if (!this.__range__) {
      this.__range__ = __createRange__(this.el);
    }
    return this.__range__;
  };
};
AbstractComponent.prototype = new AbstractComponent.Prototype();

var NodeComponent = function(node, view) {
  AbstractComponent.call(this, node, view, view.el);
  this.type = "node";
  this.path = [node.id];
};
NodeComponent.Prototype = function() {
  this.getLength = function() {
    return this.node.getLength();
  };
};
NodeComponent.Prototype.prototype = AbstractComponent.prototype;
NodeComponent.prototype = new NodeComponent.Prototype();

var PropertyComponent = function(node, view, property, el, propertyPath) {
  AbstractComponent.call(this, node, view, el);
  this.type = "property";
  this.path = [node.id, property];
  this.propertyPath = propertyPath || this.path;
};
PropertyComponent.Prototype = function() {
  this.getLength = function() {
    throw new Error("This is abstract and must be overridden");
  };
};
PropertyComponent.Prototype.prototype = AbstractComponent.prototype;
PropertyComponent.prototype = new PropertyComponent.Prototype();

module.exports = {
  NodeComponent: NodeComponent,
  PropertyComponent: PropertyComponent
};
