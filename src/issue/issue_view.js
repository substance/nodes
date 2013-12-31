"use strict";

var $$ = require ("substance-application").$$;
var NodeView = require("../node/node_view");
var TextView = require("../text/text_view");


// Substance.Figure.View
// ==========================================================================

var IssueView = function(node, viewFactory) {
  NodeView.call(this, node, viewFactory);

  this.$el.addClass('issue');

  this.childViews = {
    "title": null,
    "description": null
  };
};

IssueView.Prototype = function() {

  // Rendering
  // =============================
  //

  this.render = function() {
    NodeView.prototype.render.call(this);

    var labelView = this.childViews["title"] = new TextView(this.node, this.viewFactory, {property: "title"});
    this.content.appendChild(labelView.render().el);

    // this.content.appendChild($$('.issue-description', {
    //   text: "HELLO I AM AN ISSUE"
    // }));

    var descriptionView = this.childViews["description"] = new TextView(this.node, this.viewFactory, {property: "description"});
    this.content.appendChild(descriptionView.render().el);

    // var caption = this.node.getCaption();
    // if (caption) {
    //   var captionView = this.childViews["caption"] = this.viewFactory.createView(caption);
    //   var captionEl = captionView.render().el;
    //   captionEl.classList.add('caption');
    //   this.content.appendChild(captionEl);
    // }

    return this;
  };
};


IssueView.Prototype.prototype = NodeView.prototype;
IssueView.prototype = new IssueView.Prototype();

module.exports = IssueView;
