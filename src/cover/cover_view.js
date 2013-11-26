"use strict";

var _ = require("underscore");
var NodeView = require("../node/node_view");
var $$ = require("substance-application").$$;


// Lens.Cover.View
// ==========================================================================

var CoverView = function(node, viewFactory) {
  NodeView.call(this, node, viewFactory);

  this.$el.attr({id: node.id});
  this.$el.addClass("content-node cover");
};

CoverView.Prototype = function() {

  this.render = function() {
    NodeView.prototype.render.call(this);
    var node = this.node;

    if (this.node.document.published_on) {
      this.content.appendChild($$('.published-on', {
        html: new Date(this.node.document.published_on).toDateString()
      }));
    }

    this.content.appendChild($$('.title', {text: node.title }));

    var authorRefs = this.node.getAuthorRefs();
    if (authorRefs) {
      var authorsEl = document.createElement("DIV");
      authorsEl.classList.add("authors");
      var authorRefEl;
      for (var i = 0; i < authorRefs.length; i++) {
        var ref = authorRefs[i];
        var author = this.node.document.get(ref.target);
        authorRefEl = document.createElement("SPAN");
        // TODO: use data-* attribute to store the referenced collaborator node
        authorRefEl.setAttribute("id", ref.id);
        authorRefEl.classList.add("annotation");
        authorRefEl.classList.add("person_reference");
        authorRefEl.innerHTML = author.name;
        authorsEl.appendChild(authorRefEl);
      }
      this.content.appendChild(authorsEl);
    }

    if (this.node.image) {
      this.el.style.backgroundImage = "url('"+this.node.image+"')";
    }

    this.__mapping__ = null;

    return this;
  };

  // Retrieves the corresponding character position for the given DOM position.
  // --------
  //

  this.getCharPosition = function(el, offset) {
    if (!this.__mapping__) this.createMapping();
    var charPos = this.__getCharPosition__(el, offset);
    console.log("Cover.View: getCharPosition()", charPos);
    return charPos;
  };

  // Retrieves the corresponding DOM position for a given character.
  // --------
  //

  this.getDOMPosition = function(charPos) {
    if (!this.__mapping__) this.createMapping();

    var range = this.__getDOMPosition__(charPos);
    console.log("Cover.View: getDOMPosition()", range);

    return range;
  };

  this.getLength = function() {
    if (!this.__mapping__) this.createMapping();

    return this.__getLength__();
  };

  this.__createRange__ = function(el) {
    var range = document.createRange();
    range.selectNode(el);
    return range;
  };

  this.createMapping = function() {
    // this view allows to set the cursor on
    // - title
    // - author refs
    var mapping = [];
    var self = this;

    var titleEl = this.el.querySelector(".title");

    // TODO: there is redundancy here: the model needs to define a getLength()
    // maybe it is possible to let the model give certain type of items in the expected order
    // and we augment these with the range mapping inteface here
    // TODO2: the range can not be created before the root element is inserted into the DOM
    // therefor it would be interesting to specify the mappings not providing the range instances
    // but the elements instead and create the ranges lazily

    mapping.push({
      label: "title",
      getLength: function() {
        // HACK: +1 to have an extra position after the title
        return self.node.title.length + 1;
      },
      range: this.__createRange__(titleEl),
      getRange: function(charPos) {
        var range = document.createRange();
        range.setStart(titleEl.children[0], charPos);
        return range;
      }
    });

    var authorRefs = this.node.getAuthorRefs();
    if (authorRefs) {
      var authorRefEls = this.el.querySelectorAll("SPAN.person_reference");
      _.each(authorRefs, function(ref, i) {
        var author = this.node.document.get(ref.target);
        var el = authorRefEls[i];
        mapping.push({
          label: "author_"+i,
          range: this.__createRange__(el),
          getLength: function() {
            return author.name.length;
          },
          getRange: function(charPos) {
            var range = document.createRange();
            range.setStart(el.children[0], charPos);
            return range;
          }
        });
      }, this);
    }

    this.__mapping__ = mapping;
  };

  this.__getCharPosition__ = function(el, offset) {
    var range = document.createRange();
    range.setStart(el, offset);

    var charPos = 0;

    for (var i = 0; i < this.__mapping__.length; i++) {
      var mapping = this.__mapping__[i];

      var cmpStart = range.compareBoundaryPoints(0, mapping.range);
      console.log("Comparing boundaries for", mapping.label, "START", cmpStart);
      if (cmpStart < 0) {
        break;
      }

      var cmpEnd = range.compareBoundaryPoints(3, mapping.range);
      console.log("Comparing boundaries for", mapping.label, "END", cmpEnd);

      // the cursor is within this element
      if (cmpEnd < 0) {
        charPos += offset;
        break;
      } else {
        charPos += mapping.getLength();
      }
    }

    return charPos;
  };

  this.__getDOMPosition__ = function(charPos) {
    var l, mapping;
    for (var i = 0; i < this.__mapping__.length; i++) {
      mapping = this.__mapping__[i];
      l = mapping.getLength();

      if (charPos<l) {
        return mapping.getRange(charPos);
      } else {
        charPos -= l;
      }
    }
    return mapping.getRange(l);
  };

};

CoverView.Prototype.prototype = NodeView.prototype;
CoverView.prototype = new CoverView.Prototype();

module.exports = CoverView;
