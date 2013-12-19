"use strict";

var $$ = require("substance-application").$$;
var NodeView = require("../node/node_view");
var TextView = require("../text/text_view");

// Lens.Cover.View
// ==========================================================================

var CoverView = function(node, viewFactory) {
  NodeView.call(this, node, viewFactory);

  this.$el.attr({id: node.id});
  this.$el.addClass("content-node cover");

  this.childViews = {
    "title": null
  };
};

CoverView.Prototype = function() {

  this.render = function() {
    NodeView.prototype.render.call(this);

    if (this.node.document.published_on) {
      this.content.appendChild($$('.published-on', {
        html: new Date(this.node.document.published_on).toDateString()
      }));
    }

    var titleView = this.childViews["title"] = new TextView(this.node, this.viewFactory, {property: "title"});
    this.content.appendChild(titleView.render().el);
    titleView.el.classList.add("title");

    var authorRefs = this.node.getAuthorRefs();
    if (authorRefs) {
      var authorsEl = $$(".authors", { "data-path": "authors"} );
      var authorRefEl;
      for (var i = 0; i < authorRefs.length; i++) {
        // TODO: use data-* attribute to store the referenced collaborator node
        var ref = authorRefs[i];
        var author = this.node.document.get(ref.target);
        authorRefEl = $$("span.annotation.person_reference", {
          id: ref.id,
          text: author.name,
          'data-path': ref.id
        });
        authorsEl.appendChild(authorRefEl);
      }
      this.content.appendChild(authorsEl);
    }

    if (this.node.image) {
      this.el.style.backgroundImage = "url('"+this.node.image+"')";
    }

    return this;
  };

  this.onGraphUpdate = function(op) {
    if (op.path[0] === "document" && op.path[1] === "title") {
      this.childViews["title"].el.childNodes[0].textContent = this.node.title;
    }
  };
};

CoverView.Prototype.prototype = NodeView.prototype;
CoverView.prototype = new CoverView.Prototype();

module.exports = CoverView;
