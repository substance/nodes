"use strict";

var NodeView = require('../node/node_view');
var $$ = require("substance-application").$$;
var Fragmenter = require("substance-util").Fragmenter;
var TextSurface = require("./text_surface");

// Substance.Text.View
// -----------------
//
// Manipulation interface shared by all textish types (paragraphs, headings)
// This behavior can overriden by the concrete node types

function _getAnnotationBehavior(doc) {
  if (doc.constructor && doc.constructor.annotationBehavior) {
    return doc.constructor.annotationBehavior;
  } else {
    throw new Error("Missing AnnotationBehavior.");
  }
}

var TextView = function(node, renderer, options) {
  NodeView.call(this, node);
  options = options || {};

  this.property = options.property || "content";

  this.$el.addClass('content-node text');

  if (node.type === "text") {
    this.$el.addClass("text-node");
  }

  // If TextView is used to display a custom property,
  // we don't have an id. Only full-fledged text nodes
  // have id's.
  if (options.property) {
    // Note: currently NodeView sets the id. In this mode the must not be set
    // as we are displaying a textish property of a node, not a text node.
    // IMO it is ok to have the id set by default, as it is the 99% case.
    this.$el.removeAttr('id');
    this.$el.removeClass('content-node');
    // this.$el.addClass('node-property');
    this.$el.addClass(options.property);
    this.$el.attr('data-path', options.property);
  }

  this._annotations = {};
  this.annotationBehavior = _getAnnotationBehavior(node.document);

  // Note: usually the surface is not needed within the view.
  // However, here I wan't to use the getDOMPosition function to an easy implementation of the
  // incremental text insertion/deletion.
  this.__surface = new TextSurface(this.node, null, {property: this.property});
  this.__surface.attachView(this);
};

var _findTextEl;

TextView.Prototype = function() {

  // Rendering
  // =============================
  //

  this.render = function(enhancer) {
    NodeView.prototype.render.call(this, enhancer);

    this.renderContent();
    return this;
  };

  this.renderContent = function() {
    this.content.innerHTML = "";
    this._annotations = this.node.document.getIndex("annotations").get([this.node.id, this.property]);
    this.renderWithAnnotations(this._annotations);
  };


  this.insert = function(pos, str) {
    var range = this.__surface.getDOMPosition(pos);
    var textNode = range.startContainer;
    var offset = range.startOffset;

    var text = textNode.textContent;
    text = text.substring(0, offset) + str + text.substring(offset);
    textNode.textContent = text;
  };

  this.delete = function(pos, length) {
    var range = this.__surface.getDOMPosition(pos);
    var textNode = range.startContainer;
    var offset = range.startOffset;
    var text = textNode.textContent;
    text = text.substring(0, offset) + text.substring(offset+length);
    textNode.textContent = text;
  };

  this.onNodeUpdate = function(op) {
    // console.log("TextView.onNodeUpdate()", op);
    if (op.path[1] === this.property) {
      // console.log("Updating text view: ", op);
      if (op.type === "update") {
        var update = op.diff;
        if (update.isInsert()) {
          this.insert(update.pos, update.str);
        } else if (update.isDelete()) {
          this.delete(update.pos, update.str.length);
        }
      } else if (op.type === "set") {
        this.renderContent();
      }
    }
  };

  this.onGraphUpdate = function(op) {
    NodeView.prototype.onGraphUpdate.call(this, op);

    var doc = this.node.document;
    var schema = doc.getSchema();

    var node;
    if (op.type !== "delete") {
      node = doc.get(op.path[0]);
    } else {
      node = op.val;
    }
    if (schema.isInstanceOf(node.type, "annotation")) {
      var rerender = false;
      if (node.path[0] === this.node.id) {
        rerender = true;
      } else if (op.type === "set" && op.path[1] === "path" && op.original[0] === this.node.id) {
        rerender = true;
      }

      if (rerender) {
        //console.log("Rerendering TextView due to annotation update", op);
        this.renderContent();
      }
    }
  };

  this.createAnnotationElement = function(entry) {
    var el;
    if (entry.type === "link") {
      el = $$('a.annotation.'+entry.type, {
        id: entry.id,
        href: this.node.document.get(entry.id).url // "http://zive.at"
      });
    } else {
      el = $$('span.annotation.'+entry.type, {
        id: entry.id
      });
    }

    return el;
  };

  this.renderWithAnnotations = function(annotations) {
    var that = this;
    var text = this.node[this.property];
    var fragment = document.createDocumentFragment();

    // this splits the text and annotations into smaller pieces
    // which is necessary to generate proper HTML.
    var fragmenter = new Fragmenter(this.annotationBehavior.levels);

    fragmenter.onText = function(context, text) {
      context.appendChild(document.createTextNode(text));
    };

    fragmenter.onEnter = function(entry, parentContext) {
      var el = that.createAnnotationElement(entry);
      parentContext.appendChild(el);
      return el;
    };

    // this calls onText and onEnter in turns...
    fragmenter.start(fragment, text, annotations);

    // set the content
    this.content.innerHTML = "";
    this.content.appendChild(fragment);
  };

  // Free the memory
  // --------

  this.dispose = function() {
    this.stopListening();
  };
};

TextView.Prototype.prototype = NodeView.prototype;
TextView.prototype = new TextView.Prototype();

var _unshiftAll = function(arr, other) {
  for (var i = 0; i < other.length; i++) {
    arr.unshift(other[i]);
  }
};

_findTextEl = function(el, pos) {
  var childNodes = [];
  _unshiftAll(childNodes, el.childNodes);

  while(childNodes.length) {
    var next = childNodes.shift();
    if (next.nodeType === Node.TEXT_NODE) {
      var t = next.textContent;
      if (t.length >= pos) {
        return [next, pos];
      } else {
        pos -= t.length;
      }
    } else {
      _unshiftAll(childNodes, next.childNodes);
    }
  }
};


module.exports = TextView;
