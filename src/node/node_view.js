"use strict";

var View = require("substance-application").View;
var ViewComponents = require("../view_components");
var _ = require("underscore");

// Substance.Node.View
// -----------------
var NodeView = function(node, viewFactory) {
  View.call(this);

  this.node = node;
  this.viewFactory = viewFactory;

  this.$el.addClass('content-node').addClass(node.type);
  this.$el.attr('id', this.node.id);
};

NodeView.Prototype = function() {

  // Rendering
  // --------
  //
  this.render = function() {
    this.disposeChildViews();
    this.el.innerHTML = "";
    this.content = document.createElement("DIV");
    this.content.classList.add("content");
    this.el.appendChild(this.content);
    return this;
  };

  this.dispose = function() {
    this.stopListening();
    this.disposeChildViews();
  };

  this.disposeChildViews = function() {
    if (this.childViews) {
      _.each(this.childViews, function(view) {
        if (view) view.dispose();
      });
    }
  };

  // A general graph update listener that dispatches
  // to `this.onNodeUpdate(op)`
  // --------
  //

  this.onGraphUpdate = function(op) {
    if(op.path[0] === this.node.id && (op.type === "update" || op.type === "set") ) {
      this.onNodeUpdate(op);
    }
  };

  // Callback to get noticed about updates applied to the underlying node.
  // --------
  //

  this.onNodeUpdate = function(/*op*/) {
    // do nothing by default
  };


  // Selection API
  // --------


  // Retrieves the corresponding character position for the given DOM position.
  // --------
  //

  this.getCharPosition = function(el, offset) {
    if (!this.__components__) this.__describeStructure__();
    var charPos = this.__getCharPosition__(el, offset);
    // console.log("Cover.View: getCharPosition()", charPos);
    return charPos;
  };

  // Retrieves the corresponding DOM position for a given character.
  // --------
  //

  this.getDOMPosition = function(charPos) {
    if (!this.__components__) this.__describeStructure__();
    var range = this.__getDOMPosition__(charPos);
    // console.log("Cover.View: getDOMPosition()", range);
    return range;
  };

  // Provides the view's components.
  // ----------
  // E.g., a FigureView renders the label, the image, and the caption.
  //

  this.__describeStructure__ = function() {
    this.__components__ = this.describeStructure();
  };

  this.describeStructure = function() {
    throw new Error("NodeView.describeStructure() is abstract and must be overridden.");
  };

  this.getViewComponents = function() {
    if (!this.__components__) {
      this.__describeStructure__();
      // console.error("You have to run describe layout first. node.type:" + this.node.type);
      // throw new Error("You have to run describe layout first. node.type:" + this.node.type);
    }
    return this.__components__;
  };

  this.nodeComponent = function() {
    return new ViewComponents.NodeComponent(this.node, this);
  };

  this.propertyComponent = function(name, propertyPath) {
    return new ViewComponents.PropertyComponent(this.node, this, name, propertyPath);
  };

  this.customComponent = function(path, data) {
    return new ViewComponents.CustomComponent(this.node, this, path, data);
  };

  this.__getCharPosition__ = function(el, offset) {
    var range = document.createRange();
    range.setStart(el, offset);

    var charPos = 0;

    for (var i = 0; i < this.__components__.length; i++) {
      var component = this.__components__[i];

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
        charPos = component.getLength();
      }
    }

    return charPos;
  };

  this.__getDOMPosition__ = function(charPos) {
    var l, component;
    for (var i = 0; i < this.__components__.length; i++) {
      component = this.__components__[i];

      if (!component.getLength) {
        throw new Error("The provided component can not be used with the generic mapper implementation. getLength() missing.");
      }
      if (!component.mapCharPos) {
        throw new Error("The provided component can not be used with the generic mapper implementation. getRange() missing.");
      }

      l = component.getLength();

      if (charPos<l) {
        return component.mapCharPos(charPos);
      } else {
        charPos -= l;
      }
    }
    return component.mapCharPos(l);
  };

  this.__createRange__ = function(el) {
    var range = document.createRange();
    range.selectNode(el);
    return range;
  };
};

NodeView.Prototype.prototype = View.prototype;
NodeView.prototype = new NodeView.Prototype();

module.exports = NodeView;
