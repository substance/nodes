"use strict";

var _ = require("underscore");
var Application = require("substance-application");
var $$ = Application.$$;
var NodeView = require("../node/node_view");
var Fragmenter = require("substance-util").Fragmenter;
var Annotator = require("substance-document").Annotator;

var SimpleTextView = function(node, viewFactory) {
  NodeView.call(this, node, viewFactory);
};

SimpleTextView.Prototype = function() {

  var __super__ = NodeView.prototype;

  this.render = function() {
    __super__.render.call(this);

    this.content.setAttribute("data-path", "content");
    this.renderContent();

    return this;
  };

  this.renderContent = function() {
    var annotations = this.node.document.getIndex("annotations").get([this.node.id, "content"]);
    this.renderWithAnnotations(annotations);

    var br = window.document.createElement("BR");
    this.content.appendChild(br);
  };

  this.createAnnotationElement = function(entry) {
    var el;
    el = $$('span.annotation.'+entry.type, {
      id: entry.id
    });

    var doc = this.node.document;

    if (entry.type === "product_reference") {
      var productRef = doc.get(entry.id);
      var category_code = doc.external.getProductCategoryCode(productRef.product_id);
      el.classList.add("category-"+category_code);
    }

    return el;
  };

  this.renderWithAnnotations = function(annotations) {
    var self = this;
    var text = this.node.content;

    var fragment = window.document.createDocumentFragment();

    var fragmenter = new Fragmenter(this.node.document.getAnnotationBehavior().levels);
    fragmenter.onText = function(context, text) {
      var el = window.document.createTextNode(text);
      context.appendChild(el);
    };
    fragmenter.onEnter = function(entry, parentContext) {
      var el = self.createAnnotationElement(entry);
      parentContext.appendChild(el);
      return el;
    };
    // this calls onText and onEnter in turns...
    fragmenter.start(fragment, text, annotations);

    // set the content
    this.content.innerHTML = "";
    this.content.appendChild(fragment);
  };


  this.onNodeUpdate = function(op) {
    if (_.isEqual(op.path, [this.node.id, "content"])) {
      this.renderContent();
      return true;
    }
    return false;
  };

  this.onGraphUpdate = function(op) {
    // Call super handler and return if that has processed the operation already
    if (__super__.onGraphUpdate.call(this, op)) {
      return true;
    }

    // Otherwise deal with annotation changes
    if (Annotator.changesAnnotations(this.node.document, op, [this.node.id, "content"])) {
      if (op.type === "create" || op.type === "delete" ||
          op.path[1] === "path" || op.path[1] === "range") {

        this.renderContent();
        return true;
      }
    }
    return false;
  };

};

SimpleTextView.Prototype.prototype = NodeView.prototype;
SimpleTextView.prototype = new SimpleTextView.Prototype();
SimpleTextView.prototype.constructor = SimpleTextView;

module.exports = SimpleTextView;
