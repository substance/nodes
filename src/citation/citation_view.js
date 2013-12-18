"use strict";

var _ = require('underscore');
var util = require('substance-util');
var html = util.html;
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

    var frag = document.createDocumentFragment(),
        node = this.node;

    this.labelView = new TextView(this.node, this.viewFactory, {property: "title"});
    frag.appendChild(this.labelView.render().el);
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

    this.sourceEl = $$('.source', {
      html: source.join('')
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

  this.describeStructure = function() {
    var structure = [];
    var self = this;
    structure.push(this.propertyComponent("label", [this.node.id, "title"])
      .element(function() {
        return self.labelView.el;
      })
    );
    structure.push(this.customComponent("source")
      .element(function() {
        return self.sourceEl;
      })
    );
    structure.push(this.customComponent("doi")
      .element(function() {
        return self.doiEl;
      })
    );
    return structure;
  };
};

CitationView.Prototype.prototype = NodeView.prototype;
CitationView.prototype = new CitationView.Prototype();
CitationView.prototype.constructor = CitationView;

module.exports = CitationView;
