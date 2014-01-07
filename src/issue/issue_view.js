"use strict";

var $$ = require ("substance-application").$$;
var NodeView = require("../node/node_view");
var TextView = require("../text/text_view");


// Substance.Issue.View
// ==========================================================================

var IssueView = function(node, viewFactory) {
  NodeView.call(this, node, viewFactory);

  // This class is shared among all issue subtypes (errors, remarks)
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

    // Delete Button
    // --------

    var deleteButton = $$('a.delete-resource', {
      href: '#',
      text: "Delete",
      contenteditable: false // Make sure this is not editable!
    });

    labelView.el.appendChild(deleteButton);

    // Creator and date
    // --------

    var creator = $$('div.creator', {
      text: (this.node.creator || "Anonymous") + ", " + jQuery.timeago(new Date(this.node.created_at)),
      contenteditable: false // Make sure this is not editable!
    });

    labelView.el.appendChild(creator);

    var descriptionView = this.childViews["description"] = new TextView(this.node, this.viewFactory, {property: "description"});
    this.content.appendChild(descriptionView.render().el);

    return this;
  };
};


IssueView.Prototype.prototype = NodeView.prototype;
IssueView.prototype = new IssueView.Prototype();

module.exports = IssueView;
