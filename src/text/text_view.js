"use strict";

var _ = require("underscore");
var Fragmenter = require("substance-util").Fragmenter;
var Annotator = require("substance-document").Annotator;

var NodeView = require("../node").View;

function _getAnnotationBehavior(doc) {
  var annotationBehavior = doc.getAnnotationBehavior();
  if (!annotationBehavior) {
    throw new Error("Missing AnnotationBehavior.");
  }
  return annotationBehavior;
}

var __id__ = 0;

var TextView = function(node, viewFactory, options) {
  NodeView.call(this, node, viewFactory, options);
  options = options || {};

  // NOTE: left for debugging purposes
  this.__id__ = __id__++;
  // console.log("Creating text view...", this.__id__);

  this.property = options.property || "content";
  this.propertyPath = options.propertyPath || [this.node.id, this.property];

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

  var __super__ = NodeView.prototype;
  // Rendering
  // =============================
  //

  this.render = function(enhancer) {
    __super__.render.call(this, enhancer);

    this.renderContent();

    return this;
  };

  this.renderContent = function() {
    // console.log("TextView.renderContent", this.__id__);
    this.content.innerHTML = "";
    this._annotations = this.node.document.getIndex("annotations").get(this.propertyPath);
    this.renderWithAnnotations(this._annotations);

    // EXPERIMENTAL: trying to fix some issues that we think other implementations handle
    // with a trailing <br>
    var br = window.document.createElement("BR");
    this.content.appendChild(br);

    var text = this.getText();
    // console.log("TextView.renderContent() add empty?", this.__id__, this.propertyPath, text.length);
    if (text.length === 0 && !this.__hasFocus) {
      this.content.classList.add('empty');
    }
  };

  this.onBlur = function() {
    var text = this.getText();
    this.__hasFocus = false;
    if (!text || text.length === 0) {
      this.content.classList.add('empty');
    } else {
      this.content.classList.remove('empty');
    }
  };

  this.onFocus = function() {
    // console.log("TextView.onFocus", this.__id__, this.propertyPath);
    this.__hasFocus = true;
    this.content.classList.remove('empty');
  };

  this.insert = function(pos, str) {
    // console.log("TextView.insert",pos, str, this.__id__);
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
    // console.log("TextView.delete", pos, length, this.__id__);
    if (length === 0) {
      console.log("FIXME: received empty deletion which could be avoided.");
      return;
    }

    var result = this._lookupPostion(pos, "delete");
    var frag = result[0];
    var textNode = frag.el;
    var offset = result[1];

    var text = textNode.textContent;

    // can not do this incrementally if it is a greater delete
    if (offset+length > text.length) {
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

  // Lookup a fragment for the given position.
  // ----
  // For insertions, the annotation level is considered on annotation boundaries,
  // i.e., if the annotation is exclusive, then the outer element/fragment is returned.
  // For deletions the annotation exclusivity is not important
  // i.e., the position belongs to the next fragment
  this._lookupPostion = function(pos, is_delete) {
    var frag, l;
    for (var i = 0; i < this._fragments.length; i++) {
      frag = this._fragments[i];
      l = frag.getLength();

      // right in the middle of a fragment
      if (pos < l) {
        return [frag, pos];
      }
      // the position is not within this fragment
      else if (pos > l) {
        pos -= l;
      }
      // ... at the boundary we consider the element's level
      else {
        var next = this._fragments[i+1];
        // if the element level of the next fragment is lower then we put the cursor there
        if (next && next.level < frag.level || is_delete) {
          return [next, 0];
        }
        // otherwise we leave the cursor in the current fragment
        else {
          return [frag, l];
        }
      }
    }
    return [frag, l];
  };

  this.onNodeUpdate = function(op) {
    if (_.isEqual(op.path, this.propertyPath)) {
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

  this.onGraphUpdate = function(op, graph, target, options) {

    // chronicled operations need to be rendered non-incrementally
    if(options && options["chronicle"]) {
      // console.log("non incremental update as it is a chronicled op");
      this.renderContent();
      return true;
    }

    // Call super handler and return if that has processed the operation already
    if (__super__.onGraphUpdate.call(this, op)) {
      return true;
    }

    if (_.isEqual(op.path, this.propertyPath)) {
      this.onNodeUpdate(op);
      return true;
    }

    // Otherwise deal with annotation changes
    if (Annotator.changesAnnotations(this.node.document, op, this.propertyPath)) {
      if (op.type === "create" || op.type === "delete" ||
          op.path[1] === "path" || op.path[1] === "range") {

        // NOTE: the last condition applies to all annotation range updates
        // However, due to the incremental nature of this implementation
        // it is not necessary to trigger a full rerender when content has been
        // changed incrementally.
        if (op.data && op.data["incremental"]) {
          // console.log("... change is incremental");
          return false;
        }

        // console.log("Rerendering TextView due to annotation update", op);
        this.renderContent();
        return true;
      }
    }

    return false;
  };

  this.createAnnotationView = function(entry) {
    var annotation = this.node.document.get(entry.id);
    var AnnotationView = this.viewFactory.getNodeViewClass(annotation);
    var annotationView = new AnnotationView(annotation, this.viewFactory);
    return annotationView;
  };

  this.getText = function() {
    return this.node.document.get(this.propertyPath);
  };

  this.renderWithAnnotations = function(annotations) {
    var self = this;
    var text = this.getText();
    var fragment = window.document.createDocumentFragment();

    // this splits the text and annotations into smaller pieces
    // which is necessary to generate proper HTML.
    var fragmenter = new Fragmenter(this.annotationBehavior.levels);

    this._fragments = [];

    var _entry = null;
    var _index = 0;
    var _charPos = 0;
    var _level  = 0;

    fragmenter.onText = function(context, text) {
      var el = window.document.createTextNode(text);

      // Note: we create the data structures to allow lookup fragments
      // for coordinate mapping and incremental changes
      // TODO: to override the Fragment behavior we would need to override this
      self._fragments.push(new TextView.DefaultFragment(el, _index++, _charPos, _level));
      _charPos += text.length;
      context.appendChild(el);
    };

    fragmenter.onEnter = function(entry, parentContext) {
      _entry = entry;
      _level++;
      var annotationView = self.createAnnotationView(entry);
      parentContext.appendChild(annotationView.render().el);
      return annotationView;
    };

    fragmenter.onExit = function() {
      _level--;
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
    if (next.nodeType === window.Node.TEXT_NODE) {
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
