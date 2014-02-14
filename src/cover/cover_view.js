"use strict";

var _ = require("underscore");
var $$ = require("substance-application").$$;
var NodeView = require("../node/node_view");
var TextView = require("../text/text_view");
var Annotator = require("substance-document").Annotator;

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

    if (this.node.document.published_on) {
      this.content.appendChild($$('.published-on', {
        contenteditable: false,
        html: new Date(this.node.document.published_on).toDateString()
      }));
    }

    this.titleView =  new TextView(this.node, this.viewFactory, {property: "title"});
    this.content.appendChild(this.titleView.render().el);
    titleView.el.classList.add("title");

    this.authorsEl = $$('.authors');

    this.renderAuthors();
    this.content.appendChild(this.authorsEl);

    return this;
  };

  this.dispose = function() {
    NodeView.dispose.call(this);
    this.titleView.dispose();
  };

  this.renderAuthors = function() {
    this.authorsEl.innerHTML = "";

    var authors = this.node.document.getAuthors();
    _.each(authors, function(a) {
      var authorEl = $$('a.toggle-author', {
        id: "toggle_"+a.id,
        href: "#",
        text: a.name,
        'data-id': a.id,
      });

      this.authorsEl.appendChild(authorEl);
    }, this);
  };

  this.onGraphUpdate = function(op) {
    // Call super handler and return if that has processed the operation already
    if (NodeView.prototype.onGraphUpdate.call(this, op)) {
      return true;
    }

    if (_.isEqual(op.path, ["document","title"])) {
      this.titleView.renderContent();
      return true;
    } else if (_.isEqual(op.path, ["document", "authors"])) {
      this.renderAuthors();
    }

    // Otherwise deal with annotation changes
    // Note: the annotations do not get attached to ["document", "title"],
    // as it seems strange to annotate a property which is used in such an indirect way
    if (Annotator.changesAnnotations(this.node.document, op, ["cover", "title"])) {
      //console.log("Rerendering TextView due to annotation update", op);
      this.titleView.renderContent();
      return true;
    }
  };
};

CoverView.Prototype.prototype = NodeView.prototype;
CoverView.prototype = new CoverView.Prototype();

module.exports = CoverView;
