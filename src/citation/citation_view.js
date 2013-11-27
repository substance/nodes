"use strict";

var _ = require('underscore');
var util = require('substance-util');
var html = util.html;
var NodeView = require("../node").View;
var TextView = require("../text").View;

var $$ = require("substance-application").$$;

var Renderer = function(view) {
  var frag = document.createDocumentFragment(),
      node = view.node;

  view.labelView = new TextView(view.node, view.viewFactory, {property: "title"});
  frag.appendChild(view.labelView.render().el);
  // this.childrenViews.push(this.labelView);

  // Add Authors
  // -------

  frag.appendChild($$('.authors', {
    html: node.authors.join(', ')
  }));


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

  frag.appendChild($$('.source', {
    html: source.join('')
  }));

  // Add DOI (if available)
  // -------

  if (node.doi) {
    frag.appendChild($$('.doi', {
      children: [
        $$('b', {text: "DOI: "}),
        $$('a', {
          href: node.doi,
          target: "_new",
          text: node.doi
        })
      ]
    }));
  }

  // TODO: Add display citations urls
  // -------

  return frag;
};


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
    this.content.appendChild(Renderer(this));
    return this;
  };

};

CitationView.Prototype.prototype = NodeView.prototype;
CitationView.prototype = new CitationView.Prototype();
CitationView.prototype.constructor = CitationView;

module.exports = CitationView;
