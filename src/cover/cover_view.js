"use strict";

var _ = require("underscore");
var NodeView = require("../node/node_view");
var $$ = require("substance-application").$$;
var ViewComponents = require("../view_components");

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

    this.titleEl = $$('.title', {text: node.title });
    this.content.appendChild(this.titleEl);

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

    return this;
  };

  // TODO: invent an API for declaring the structure of the rendered node
  this.describeStructure = function() {
    var self = this;

    // TODO: there is redundancy here: the model needs to define a getLength()
    // maybe it is possible to let the model give certain type of items in the expected order
    // and we augment these with the range mapping inteface here
    // TODO2: the range can not be created before the root element is inserted into the DOM
    // therefor it would be interesting to specify the mappings not providing the range instances
    // but the elements instead and create the ranges lazily
    var titleEl = this.titleEl;
    var titleComponent = new ViewComponents.PropertyComponent(this.node, this, "title", titleEl);
    // HACK: +1 to have an extra position after the title
    titleComponent.getLength = function() {
      return self.node.title.length + 1;
    };
    titleComponent.mapCharPos = function(charPos) {
      var range = document.createRange();
      range.setStart(this.titleEl.childNodes[0], charPos);
      return range;
    };
    this.addComponent(titleComponent);


    var authorRefs = this.node.getAuthorRefs();
    if (authorRefs) {
      var authorRefEls = this.el.querySelectorAll("SPAN.person_reference");

      _.each(authorRefs, function(ref, i) {
        var author = this.node.document.get(ref.target);
        var el = authorRefEls[i];

        var authorRefComponent = new ViewComponents.PropertyComponent(author, this, name, el);
        authorRefComponent.getLength = function() {
          return author.name.length;
        };
        authorRefComponent.mapCharPos = function(charPos) {
          var range = document.createRange();
          range.setStart(el.childNodes[0], charPos);
          return range;
        };
        this.addComponent(authorRefComponent);
      }, this);
    }
  };

  this.onGraphUpdate = function(op) {
    if (op.path[0] === "document" && op.path[1] === "title") {
      this.titleEl.childNodes[0].textContent = this.node.title;
    }
  };
};

CoverView.Prototype.prototype = NodeView.prototype;
CoverView.prototype = new CoverView.Prototype();

module.exports = CoverView;
