"use strict";

var NodeSurface = require("../node/node_surface");
var TextSurface = require("../text/text_surface");

var __titleComponent;
var __authorRefComponent;

var CoverSurface = function(node, surfaceProvider) {
  NodeSurface.call(this, node, surfaceProvider);

  this.components.push(__titleComponent(this));

  var authorRefs = this.node.getAuthorRefs();
  if (authorRefs) {
    for (var i = 0; i < authorRefs.length; i++) {
      var ref = authorRefs[i];
      this.components.push(__authorRefComponent(this, ref));
    }
  }
};
CoverSurface.prototype = NodeSurface.prototype;

__titleComponent = function(self) {
  // TODO: it is not very convenient to create a Text sub-surface for a textish property:
  var titleSurface = new TextSurface(self.node, self.surfaceProvider, { property: "title", propertyPath: ["document", "title"]});
  var titleComponent = titleSurface.components[0];
  titleComponent.element(function() {
    return self.view.childViews["title"].el;
  });
  titleComponent.length(function() {
    // HACK: somehow we need a plus one here... dunno
    return self.node.title.length + 1;
  });
  return titleComponent;
};

__authorRefComponent = function(self, ref) {
  var author = self.node.document.get(ref.target);
  var authorRefComponent = self.customComponent(["cover", "authors", ref.id], {propertyPath: [author.id, "name"]})
    .element(function() {
      var el = self.view.el.querySelector("span.person_reference#"+ref.id);
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

module.exports = CoverSurface;
