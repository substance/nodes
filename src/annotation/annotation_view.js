"use strict";

// EXPERIMENTAL
// Together with inline-elements, this needs to refactored in future.
// In Lens we have managed to render annotations using the view factory.
// This way, we can provide custom implementations for
// different annotations:
// - Text annotations: as it is currently; provides a container element which
//   is filled by the fragmenter
// - Inline elements: are not nested and are rendered without descending

var AnnotationView = function(node, viewFactory) {
  this.node = node;
  this.viewFactory = viewFactory;
  this.el = this.createElement();
};

AnnotationView.Prototype = function() {

  this.elementType = 'span';

  this.createElement = function() {
    var el = window.document.createElement(this.elementType);
    el.dataset.id = this.node.id;
    el.classList.add('annotation');
    el.classList.add(this.node.type);
    return el;
  };

  this.render = function() {
    return this;
  };

  this.appendChild = function(content) {
    this.el.appendChild(content);
  };

};

AnnotationView.prototype = new AnnotationView.Prototype();
AnnotationView.prototype.constructor = AnnotationView;

module.exports = AnnotationView;
