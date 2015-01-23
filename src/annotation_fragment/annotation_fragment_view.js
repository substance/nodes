"use strict";

var $$ = require("substance-application").$$;

var AnnotationView = require('../annotation/annotation_view');

var AnnotationFragmentView = function() {
  AnnotationView.apply(this, arguments);

  this.content = window.document.createElement('span');
};
AnnotationFragmentView.Prototype = function() {
  var __super__ = AnnotationView.prototype;

  this.createElement = function() {
    var el = __super__.createElement.call(this);
    var annotation = this.node.document.get(this.node.annotation_id);
    el.classList.add(annotation.type);
    el.classList.add(this.node.id);
    el.dataset.annotationId = annotation.id;
    el.dataset.fragmentNumber = this.node.fragment_number;
    return el;
  };

  this.render = function() {
    this.el.innerHTML = "";

    // WIP
    if (this.node.isFirst()) {
      var leftRangeHandle = $$('span.range-handle.left', {
        children: [
          $$('i.icon-caret-up')
        ]
      });
      this.el.appendChild(leftRangeHandle);
    }

    this.el.appendChild(this.content);

    if (this.node.isLast()) {
      var rightRangeHandle = $$('span.range-handle.right', {
        children: [
          $$('i.icon-caret-up')
        ]
      });
      this.el.appendChild(rightRangeHandle);
    }

    return this;
  };

  this.appendChild = function(child) {
    this.content.appendChild(child);
  };

};
AnnotationFragmentView.Prototype.prototype = AnnotationView.prototype;
AnnotationFragmentView.prototype = new AnnotationFragmentView.Prototype();
AnnotationFragmentView.Prototype.constructor = AnnotationFragmentView;

module.exports = AnnotationFragmentView;
