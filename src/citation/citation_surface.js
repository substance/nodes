
"use strict";

var NodeSurface = require("../node/node_surface");
var TextSurface = require("../text/text_surface");

// NOTE: this is just *experimental* and will change for sure.

var CitationSurface = function(node, surfaceProvider) {
  NodeSurface.call(this, node, surfaceProvider);

  this.components.push(this.titleComponent());
  for (var i = 0; i < node.authors.length; i++) {
    this.components.push(this.authorComponent(i));
  }
  this.components.push(this.sourceComponent());
};
CitationSurface.Prototype = function() {

  this.titleComponent = function() {
    var self = this;

    // TODO: it is not very convenient to create a Text sub-surface for a textish property:
    var titleSurface = new TextSurface(this.node, this.surfaceProvider, { property: "title" });
    var titleComponent = titleSurface.components[0];
    titleComponent.element(function() {
        return self.view.childViews["title"].el;
      })
      .length(function() {
        // HACK: somehow we need a plus one here... dunno
        return self.node.title.length + 1;
      });
    titleComponent.name = "title";
    return titleComponent;
  };

  this.authorComponent = function(i) {
    var self = this;

    // TODO: it is not very convenient to create a Text sub-surface for a textish property:
    var authorComponent = this.customComponent([this.node.id, "author"+i], {name: "author"})
      .element(function() {
        return self.view.authorEls[i];
      })
      .length(function() {
        // HACK: somehow we need a plus one here... dunno
        return self.node.authors[i].length;
      })
      .mapping(function(charPos) {
        var range = document.createRange();
        range.setStart(this.el.childNodes[0], charPos);
        return range;
      });
    return authorComponent;
  };

  this.sourceComponent = function() {
    var self = this;

    var sourceComponent = this.customComponent([this.node.id, "source"], {name: "source"});
    sourceComponent.element(function() {
        return self.view.sourceEl;
      })
      .length(function() {
        // HACK: somehow we need a plus one here... dunno
        return self.node.source.length + 1;
      })
      .mapping(function(charPos) {
        var range = document.createRange();
        range.setStart(this.el.childNodes[0], charPos);
        return range;
      });
    return sourceComponent;
  };
};
CitationSurface.Prototype.prototype = NodeSurface.prototype;
CitationSurface.prototype = new CitationSurface.Prototype();

module.exports = CitationSurface;
