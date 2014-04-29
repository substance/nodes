"use strict";

var _ = require("underscore");
var Component = require("substance-document").Component;

var __createRange__ = function(el) {
  var range = window.document.createRange();
  range.selectNode(el);
  return range;
};

function SurfaceComponent(nodeSurface, root, path, options) {
  Component.call(this, root, path, options);

  this.surface = nodeSurface;
  this.__range__ = null;
  this.__el__ = null;

  if (options.element) {
    this.__getElement__ = options.element;
  }

  if (options.mapCharPos) {
    this.__mapCharPos__ = options.mapCharPos;
  }
};

SurfaceComponent.Prototype = function() {

  this.__getElement__ = function() {
    throw new Error("This method is abstract and must be overridden");
  };

  this.mapCharPos = function(charPos) {
    return this.__mapCharPos__.call(this, charPos);
  };

  this.__mapCharPos__ = function() {
    throw new Error("This method is abstract and must be overridden");
  };

  this.getElement = function() {
    return this.el;
  };

  this.getRange = function() {
    return this.range;
  };

};

SurfaceComponent.Prototype.prototype = Component.prototype;
SurfaceComponent.prototype = new SurfaceComponent.Prototype();

Object.defineProperties(SurfaceComponent.prototype, {
  "range": {
    get: function() {
      if (!this.__range__) {
        this.__range__ = __createRange__(this.el);
      }
      return this.__range__;
    }
  },
  "el": {
      get: function() {
      if (!this.__el__) {
        this.__el__ = this.__getElement__.call(this);
        if (!this.__el__) {
          throw new Error("You tried to access a component which has not been rendered!");
        }
      }
      return this.__el__;
    }
  }
});

module.exports = SurfaceComponent;
