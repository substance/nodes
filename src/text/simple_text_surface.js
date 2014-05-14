"use strict";

var NodeSurface = require("../node/node_surface");
var SurfaceComponent = require("../node/surface_component");

var SimpleTextSurface = function(node, surfaceProvider) {
  NodeSurface.call(this, node, surfaceProvider);
  var self = this;

  var component = new SurfaceComponent(this, node, [node.id, "content"]);

  component.__getLength__ = function() {
    return self.node.content.length;
  };

  component.__getElement__ = function() {
    return self.view.el;
  };

  this.components.push(component);
};

SimpleTextSurface.Prototype = function() {

  this.getCharPosition = function(el, offset) {
    if (!this.view) {
      throw new Error("No view attached.");
    }
    var charPos;

    // A naive implementation based on DOM Range.toString()
    var range = window.document.createRange();
    range.setStart(this.view.el, 0);
    range.setEnd(el, offset);
    charPos = range.toString().length;

    // console.log("SimpleTextSurface.getCharPosition(): ", charPos);
    return charPos;
  };

  this.getDOMPosition = function(charPos) {
    if (!this.view) {
      throw new Error("No view attached.");
    }
    var pos = 0;
    var el = this.view.el;
    var offset = 0;

    this.eachTextNode(this.view.el, function(textEl) {
      el = textEl;
      var text = textEl.textContent;
      if (pos + text.length > charPos) {
        offset = charPos - pos;
        return "break";
      } else {
        pos += text.length;
      }
    });

    var range = window.document.createRange();
    range.setStart(el, offset);
    return range;
  };

  this.eachTextNode = function(el, handler) {
    if (el.childNodes.length > 0) {
      for (var i = 0; i < el.childNodes.length; i++) {
        var child = el.childNodes[i];
        if(this.eachTextNode(child, handler) === "break") {
          return "break";
        }
      }
    } else if (el.nodeType == window.Node.TEXT_NODE) {
      return handler(el);
    }
  };

};
SimpleTextSurface.Prototype.prototype = NodeSurface.prototype;
SimpleTextSurface.prototype = new SimpleTextSurface.Prototype();

module.exports = SimpleTextSurface;
