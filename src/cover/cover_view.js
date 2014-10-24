"use strict";

var _ = require("underscore");
var NodeView = require("../node/node_view");
var $$ = require("substance-application").$$;


// Lens.Cover.View
// ==========================================================================

var CoverView = function(node, viewFactory) {
  NodeView.call(this, node, viewFactory);
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


    this.content.appendChild($$('.title', {text: node.getTitle() }));


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
      this.el.style.backgroundImage = "url('"+this.node.image+"')"
    }

    return this;
  };
};

CoverView.Prototype.prototype = NodeView.prototype;
CoverView.prototype = new CoverView.Prototype();

module.exports = CoverView;
