"use strict";

var NodeView = require('../node/node_view');
var $$ = require("substance-application").$$;
var Fragmenter = require("substance-util").Fragmenter;
var Annotator = require("substance-document").Annotator;

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
    this.$el.addClass(options.property);
  }

  this.$el.attr('data-path', this.property);

  this._annotations = {};
  this.annotationBehavior = _getAnnotationBehavior(node.document);

  // Note: due to (nested) annotations this DOM node is fragmented
  // into several child nodes which contain a primitive DOM TextNodes.
  // We wrap each of these nodes into a Fragment object.
  // A Fragment object offers the chance to override things like the
  // interpreted length or the manipulation behavior.
  this._fragments = [];
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
    console.log("Rerendering TextView...");
    this.content.innerHTML = "";

    this._annotations = this.node.document.getIndex("annotations").get([this.node.id, this.property]);
    this.renderWithAnnotations(this._annotations);
  };

  this.insert = function(pos, str) {
    console.log("Trying incremental insert....");
    var result = this._lookupPostion(pos);
    var frag = result[0];
    var textNode = frag.el;
    var offset = result[1];

    var text = textNode.textContent;
    text = text.substring(0, offset) + str + text.substring(offset);
    textNode.textContent = text;

    // update the cached fragment positions
    for (var i = frag.index+1; i < this._fragments.length; i++) {
      this._fragments[i].charPos += str.length;
    }
  };

  this.delete = function(pos, length) {
    var result = this._lookupPostion(pos);
    var frag = result[0];
    var textNode = frag.el;
    var offset = result[1];

    var text = textNode.textContent;

    // can not do this incrementally if it is a greater delete
    if (length >= text.length) {
      this.renderContent();
      return;
    }

    text = text.substring(0, offset) + text.substring(offset+length);
    textNode.textContent = text;

    // update the cached fragment positions
    for (var i = frag.index+1; i < this._fragments.length; i++) {
      this._fragments[i].charPos -= length;
    }
  };

  this._lookupPostion = function(pos) {
    var frag, l;
    for (var i = 0; i < this._fragments.length; i++) {
      frag = this._fragments[i];
      l = frag.getLength();

      // TODO: here we need to consider the inclusivity rules for annotations
      // I.e., current has a lower level, then add
      if (pos < l) {
        return [frag, pos];
      }
      else if (pos > l+1) {
        pos -= l;
      } else {
        var next = frag[i+1];
        if (next && next.level < frag.level) {
          return [next, 0];
        } else {
          return [frag, l];
        }
      }
    }
    return [frag, l];
  };

  this.onNodeUpdate = function(op) {
    if (op.path[1] === this.property) {
      // console.log("Updating text view: ", op);
      if (op.type === "update") {
        var update = op.diff;
        if (update.isInsert()) {
          this.insert(update.pos, update.str);
          return true;
        } else if (update.isDelete()) {
          this.delete(update.pos, update.str.length);
          return true;
        }
      } else if (op.type === "set") {
        this.renderContent();
        return true;
      }
    }
    return false;
  };

  this.onGraphUpdate = function(op) {
    // Call super handler and return if that has processed the operation already
    if (NodeView.prototype.onGraphUpdate.call(this, op)) {
      return true;
    }


    // Otherwise deal with annotation changes
    if (Annotator.changesAnnotations(this.node.document, op, [this.node.id, this.property])) {
      if (op.type === "create" || op.type === "delete") {
        console.log("Rerendering TextView due to annotation update", op);
        this.renderContent();
        return true;
      }
    }

    return false;
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
    var self = this;
    var text = this.node[this.property];
    var fragment = document.createDocumentFragment();

    // this splits the text and annotations into smaller pieces
    // which is necessary to generate proper HTML.
    var fragmenter = new Fragmenter(this.annotationBehavior.levels);

    this._fragments = [];

    var _entry = null;
    var _index = 0;
    var _charPos = 0;

    fragmenter.onText = function(context, text) {
      var el = document.createTextNode(text);

      // Note: we create the data structures to allow lookup fragments
      // for coordinate mapping and incremental changes
      // TODO: to override the Fragment behavior we would need to override this
      var level = _entry ? _entry.level : 0;
      self._fragments.push(new TextView.DefaultFragment(el, _index++, _charPos, level));
      _charPos += text.length;
      context.appendChild(el);
    };

    fragmenter.onEnter = function(entry, parentContext) {
      _entry = entry;
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

TextView.Fragment = function(el, index, charPos, level) {
  this.el = el;

  // the position in the fragments array
  this.index = index;

  this.charPos = charPos;

  // Note: the level is used to determine the behavior at element boundaries.
  // Basiscally, for character positions at the boundaries, a manipulation is done
  // in the node with lower level.
  this.level = level;

};

TextView.Fragment.Prototype = function() {
  this.getLength = function() {
    throw new Error("This method is abstract");
  };
};
TextView.Fragment.prototype = new TextView.Fragment.Prototype();

TextView.DefaultFragment = function() {
  TextView.Fragment.apply(this, arguments);
};
TextView.DefaultFragment.Prototype = function() {
  this.getLength = function() {
    return this.el.length;
  };
};
TextView.DefaultFragment.Prototype.prototype = TextView.Fragment.prototype;
TextView.DefaultFragment.prototype = new TextView.DefaultFragment.Prototype();

module.exports = TextView;
