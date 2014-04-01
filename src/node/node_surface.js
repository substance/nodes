"use strict";

// Node.Surface
// ========
//
// A NodeSurface describes the structure of a node view and takes care of
// selection mapping.
// It is an adapter to Substance.Surface. Particularly, Substance.Document.Container needs
// this to establish the Model coordinate system.
//
// A Model coordinate is a tuple `(nodePos, charPos)` which describes a position in
// a document's view.
// As nodes can be rendered very arbitrarily and also hierarchically, the Container creates
// a flattened sequence of components.
//
// For instance, consider a Figure node which basicallly consists of three components: label, image, and caption.
// In the `content` view the Figure node is registered e.g., as `figure_1`.
// The container would expand this (roughly) to [ [`figure1`, `label`], [`figure1`, `image`], [`caption1`] ].
// I.e., it expands the single node into a flat representation of its sub-components.
// We call this representation the surface of a node.
//
// There are several kinds of components: nodes, properties, and others.
// If a node does not have any sub-components it has a node-component as its surface.
// If a component that represents a node's property is provided by the property-component.
// For all other cases we introduced a custom component type.
//
// The Container uses the Node surfaces for building a Document coordinate domain.
// The main Surface uses Node surfaces to compute mappings between DOM coordinates to Document coordinates, and vice versa.

var __id__ = 0;

var NodeSurface = function(node, surfaceProvider) {
  this.__id__ = __id__++;

  this.node = node;
  this.surfaceProvider = surfaceProvider;

  // To be able to use the surface for selection mapping a view instance
  // must be attached
  this.view = null;

  this.components = [];
};

NodeSurface.Prototype = function() {

  this.hasView = function() {
    return (this.view !== null);
  };

  this.attachView = function(view) {
    this.view = view;
  };

  // Retrieves the corresponding character position for the given DOM position.
  // --------
  //

  this.getCharPosition = function(el, offset) {
    if (!this.view) {
      throw new Error("No view attached.");
    }

    var charPos = this.__getCharPosition__(el, offset);
    // console.log("Cover.View: getCharPosition()", charPos);
    return charPos;
  };

  // Retrieves the corresponding DOM position for a given character.
  // --------
  //

  this.getDOMPosition = function(charPos) {
    if (!this.view) {
      throw new Error("No view attached.");
    }

    var range = this.__getDOMPosition__(charPos);
    // console.log("Cover.View: getDOMPosition()", range);
    return range;
  };

  this.__getCharPosition__ = function(el, offset) {
    var range = window.document.createRange();
    range.setStart(el, offset);

    var charPos = 0;

    for (var i = 0; i < this.components.length; i++) {
      var component = this.components[i];

      var cmpStart = range.compareBoundaryPoints(0, component.getRange());

      // console.log("Comparing boundaries for", component.label, "START", cmpStart);
      if (cmpStart < 0) {
        break;
      }

      var cmpEnd = range.compareBoundaryPoints(3, component.getRange());
      // console.log("Comparing boundaries for", component.label, "END", cmpEnd);

      // the cursor is within this component
      if (cmpEnd < 0) {
        charPos = offset;
      } else {
        charPos = component.length;
      }
    }

    return charPos;
  };

  this.__getDOMPosition__ = function(charPos) {
    var l, component;
    for (var i = 0; i < this.components.length; i++) {
      component = this.components[i];

      l = component.length();

      if (charPos<l) {
        return component.mapCharPos(charPos);
      } else {
        charPos -= l;
      }
    }
    return component.mapCharPos(l);
  };

  this.__createRange__ = function(el) {
    var range = window.document.createRange();
    range.selectNode(el);
    return range;
  };

};
NodeSurface.prototype = new NodeSurface.Prototype();

module.exports = NodeSurface;
