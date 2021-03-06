"use strict";

var NodeSurface = require("../node/node_surface");
var SurfaceComponent = require("../node/surface_component");

var TextSurface = function(node, surfaceProvider, options) {
  NodeSurface.call(this, node, surfaceProvider);
  options = options || {};
  var self = this;

  this.property = options.property || "content";

  if (self.node[self.property] === undefined) {
    throw new Error("Illegal property", self.node, self.property);
  }

  // default implementation for component.length
  options.length = options.length || function() {
    return self.node[self.property].length;
  };

  var component = new SurfaceComponent(this, options.root || node, [node.id, self.property], options);

  if (options.property) {
    // HACK: this does not work for arbitrarily nested views
    component.__getElement__ = function() {
      return self.view.childViews[self.property].el;
    };
  } else {
    component.__getElement__ = function() {
      return self.view.el;
    };
  }

  this.components.push(component);
};

// This surface has not been refactored. We simply override the default implementation
// and use the existing implementation.
TextSurface.Prototype = function() {

  this.getCharPosition = function(el, offset) {
    if (!this.view) {
      throw new Error("No view attached.");
    }

    // Bootstrapping: cases that happened with empty text node.
    // In these cases we return charPos = 0
    if (this.view._fragments.length === 0) {
      return 0;
    }

    // This one occurs with empty nodes and after softbreaks in otherwise empty nodes
    // i.e., the selection anchor is the the parentElement
    if (el === this.view._fragments[0].el.parentElement) {
      if (offset === 0) {
        // console.log("TextSurface.getCharPosition() HACK2: 0");
        return 0;
      } else {
        // console.log("TextSurface.getCharPosition() HACK2: ", this.components[0].length);
        return this.components[0].length;
      }
    }

    // Otherwise find the correct TEXT element
    var frag;
    for (var i = 0; i < this.view._fragments.length; i++) {
      var f = this.view._fragments[i];
      if (f.el === el) {
        frag = f;
        break;
      }
    }

    if (!frag) {
      console.error("TextSurface.getCharPosition(): Could not lookup text element.", el);
      throw new Error("Could not lookup text element.");
    }

    var charPos = frag.charPos + offset;

    // console.log("TextSurface.getCharPosition(): ", charPos);
    return charPos;
  };

  // Returns the corresponding DOM element position for the given character
  // --------
  //
  // A DOM position is specified by a tuple of element and offset.
  // In the case of text nodes it is a TEXT element.

  this.getDOMPosition = function(charPos) {
    if (!this.view) {
      throw new Error("No view attached.");
    }
    var result = this.view._lookupPostion(charPos);
    var frag = result[0];
    var offset = result[1];

    var range = window.document.createRange();
    range.setStart(frag.el, offset);
    return range;
  };

  this.getComponent = function() {
    return this.components[0];
  };
};
TextSurface.Prototype.prototype = NodeSurface.prototype;
TextSurface.prototype = new TextSurface.Prototype();

// A helper which turned out to be useful for editable textish properties
// --------
// The node view must provide a corresponding view under `childViews[property]`

TextSurface.textProperty = function(nodeSurface, property, options) {
  options = options || {};

  // propagate the root node
  options.root = options.root || nodeSurface.node;
  options.name = property;

  var node = nodeSurface.node;

  if (options.path) {
    node = nodeSurface.node.document.get(options.path[0]);
    options.alias = [nodeSurface.node.id, property];
  } else {
    options.property = property;
  }

  var propertySurface = new TextSurface(node, nodeSurface.surfaceProvider, options);
  var propertyComponent = propertySurface.components[0];
  return propertyComponent;
};

module.exports = TextSurface;
