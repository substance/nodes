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

  // TODO: invent an API for declaring the structure of the rendered node
  this.describeStructure = function() {
    var structure = [];
    var self = this;

    var titleComponent = this.propertyComponent("title", ["document", "title"])
      .element(function() {
        return self.childViews["title"].el;
      })
      .length(function() {
        // HACK: somehow we need a plus one here... dunno
        return self.node.title.length + 1;
      })
      .mapping(function(charPos) {
        return self.childViews["title"].getDOMPosition(charPos);
      });
    structure.push(titleComponent);

    var authorRefs = this.node.getAuthorRefs();
    if (authorRefs) {
      for (var i = 0; i < authorRefs.length; i++) {
        var ref = authorRefs[i];
        structure.push(this.__describeAuthorRef(ref));
      }
    }
    return structure;
  };

  this.__describeAuthorRef = function(ref) {
    var self = this;
    var author = this.node.document.get(ref.target);
    var authorRefComponent = this.customComponent(["cover", "authors", ref.id], {propertyPath: [author.id, "name"]})
      .element(function() {
        var el = self.el.querySelector("span.person_reference#"+ref.id);
        if (!el) {
          throw new Error("Could not select element for person reference");
        }
        return el;
      })
      .length(function() {
        return author.name.length;
      })
      .mapping(function(charPos) {
        var range = document.createRange();
        range.setStart(this.el.childNodes[0], charPos);
        return range;
      });
    return authorRefComponent;
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
