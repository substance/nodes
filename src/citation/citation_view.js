"use strict";

var NodeView = require("../node").View;
var TextView = require("../text").View;

var $$ = require("substance-application").$$;

// Citation.View
// ==========================================================================


var CitationView = function(node) {
  NodeView.call(this, node);

  this.$el.attr({id: node.id});
  this.$el.addClass('citation');

  this.childViews = {
    "title": null
  };
};


CitationView.Prototype = function() {

  this.render = function() {
    NodeView.prototype.render.call(this);

    var frag = document.createDocumentFragment(),
        node = this.node;

    // TODO: rename this to title*
    var titleView = this.childViews["title"] = new TextView(this.node, this.viewFactory, {property: "title"});
    frag.appendChild(titleView.render().el);

    // Add Authors
    // -------

    this.authorEls = [];
    var authorsEl = $$('.authors');
    for (var i = 0; i < node.authors.length; i++) {
      var author = node.authors[i];
      this.authorEls.push($$('span.author', {
        text: author,
        "data-path": "author"+i
      }));
      authorsEl.appendChild(this.authorEls[i]);
      authorsEl.appendChild(document.createTextNode(" "));
    }
    frag.appendChild(authorsEl);

    // Add Source
    // -------
    var source = [];

    if (node.source && node.volume) {
      source.push([node.source, node.volume].join(', ')+": ");
    }

    if (node.fpage && node.lpage) {
      source.push([node.fpage, node.lpage].join('-')+", ");
    }

    if (node.publisher_name && node.publisher_location) {
      source.push([node.publisher_name, node.publisher_location].join(', ')+", ");
    }

    if (node.year) {
      source.push(node.year);
    }

    this.sourceEl = $$('.source', {
      html: source.join(''),
      // "data-path": "source"
    });
    frag.appendChild(this.sourceEl);

    // Add DOI (if available)
    // -------

    if (node.doi) {
      this.doiEl = $$('.doi', {
        children: [
          $$('b', {text: "DOI: "}),
          $$('a', {
            href: node.doi,
            target: "_new",
            text: node.doi
          })
        ]
      });
      frag.appendChild(this.doiEl);
    }

    this.content.appendChild(frag);

    return this;
  };
};

CitationView.Prototype.prototype = NodeView.prototype;
CitationView.prototype = new CitationView.Prototype();
CitationView.prototype.constructor = CitationView;

module.exports = CitationView;
