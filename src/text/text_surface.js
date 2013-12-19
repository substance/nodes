"use strict";

var NodeSurface = require("../node/node_surface");

var TextSurface = function(node, surfaceProvider, options) {
  NodeSurface.call(this, node, surfaceProvider);
  options = options || {};
  this.property = options.property || "content";

  var self = this;
  this.components.push(this.nodeComponent()
    .length(function() {
      self.node[self.property].length;
    })
  );
};

// This surface has not been refactored. We simply override the default implementation
// and use the existing implementation.
TextSurface.Prototype = function() {

  this.getCharPosition = function(el, offset) {
    if (!this.view) {
      throw new Error("No view attached.");
    }
    if (!this.view.content) {
      throw new Error("Not rendered yet.");
    }
    var content = this.view.content;

    // TODO: this is maybe too naive
    // lookup the given element and compute a
    // the corresponding char position in the plain document
    var range = document.createRange();
    range.setStart(content.childNodes[0], 0);
    range.setEnd(el, offset);
    var str = range.toString();
    var charPos = Math.min(this.node[this.property].length, str.length);

    // console.log("Requested char pos: ", charPos, this.node.content[charPos]);

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
    if (!this.view.content) {
      throw new Error("Not rendered yet.");
    }
    var content = this.view.content;

    var range = document.createRange();

    if (this.node[this.property].length === 0) {
      range.setStart(content.childNodes[0], 0);
      return range;
    }

    // otherwise look for the containing node in DFS order
    // TODO: this could be optimized using some indexing or caching?
    var stack = [content];
    while(stack.length > 0) {
      var el = stack.pop();
      if (el.nodeType === Node.TEXT_NODE) {
        var text = el;
        if (text.length >= charPos) {
          range.setStart(el, charPos);
          return range;
        } else {
          charPos -= text.length;
        }
      } else if (el.childNodes.length > 0) {
        // push in reverse order to have a left bound DFS
        for (var i = el.childNodes.length - 1; i >= 0; i--) {
          stack.push(el.childNodes[i]);
        }
      }
    }

    console.log("Bug-Alarm: the model and the view are out of sync.");
    console.log("The model as "+charPos+" more characters");
    console.log("Returning the last available position... but please fix me. Anyone?");

    var children = content.childNodes;
    var last = children[children.length-1];
    range.setStart(last, last.length);

    return range;
  };

};
TextSurface.Prototype.prototype = NodeSurface.prototype;
TextSurface.prototype = new TextSurface.Prototype();

module.exports = TextSurface;
