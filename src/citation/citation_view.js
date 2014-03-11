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
};


CitationView.Prototype = function() {

  this.render = function() {
    NodeView.prototype.render.call(this);

    var frag = window.document.createDocumentFragment(),
        node = this.node;

    // Note: delegating to TextView to inherit annotation support
    this.titleView = new TextView(this.node, this.viewFactory, {property: "title"});
    frag.appendChild(this.titleView.render().el);

    // Resource body
    // --------
    //
    // Wraps all resource details

    var bodyEl = $$('.resource-body');

    // Add Authors
    // -------

    this.authorEls = [];
    var authorsEl = $$('.authors');
    for (var i = 0; i < node.authors.length; i++) {
      var author = node.authors[i];
      this.authorEls.push($$('span.author', {
        text: author
      }));
      authorsEl.appendChild(this.authorEls[i]);
      authorsEl.appendChild(window.document.createTextNode(" "));
    }
    bodyEl.appendChild(authorsEl);

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
    });
    bodyEl.appendChild(this.sourceEl);

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
      bodyEl.appendChild(this.doiEl);
    }

    frag.appendChild(bodyEl);

    this.content.appendChild(frag);

    return this;
  };

  this.dispose = function() {
    NodeView.dispose.call(this);
    this.titleView.dispose();
  };
};

CitationView.Prototype.prototype = NodeView.prototype;
CitationView.prototype = new CitationView.Prototype();
CitationView.prototype.constructor = CitationView;

module.exports = CitationView;
