"use strict";

var NodeView = require("../node").View;
var $$ = require("substance-application").$$;
var TextView = require("../text/text_view");

// Substance.Contributor.View
// ==========================================================================

var ContributorView = function(node) {
  NodeView.call(this, node);

  this.$el.attr({id: node.id});
  this.$el.addClass("content-node contributor");

  this.childViews = {
    "name": null,
    "organization": null,
    "email": null
  };
};

ContributorView.Prototype = function() {

  // Render it
  // --------
  //

  this.render = function() {
    NodeView.prototype.render.call(this);

    // Name element (used as a header for the resource card)
    // -------

    var nameView = this.childViews["name"] = new TextView(this.node, this.viewFactory, {property: "name"});
    $(nameView.el).addClass('toggle-resource');
    this.content.appendChild(nameView.render().el);

    // Resource Body
    // -------
    //
    // Wraps all the contents of the resource card

    var body = $$('.resource-body');

    // Image
    // -------

    if (this.node.image_url) {
      this.imageEl = $$('.image', {
        children: [$$('img', {src: this.node.image_url})]
      });
      body.appendChild(this.imageEl);
    }

    // Organization
    // -------

    var orgView = this.childViews["organization"] = new TextView(this.node, this.viewFactory, {property: "organization"});
    body.appendChild(orgView.render().el);


    // Contribution
    // -------

    if (this.node.contribution) {
      body.appendChild($$('.label', {text: 'Contribution'}));
      this.contribEl = $$('.contribution.node-property', {text: this.node.contribution, "data-path": "contribution"});
      body.appendChild(this.contribEl);
    }

    // Email
    // -------

    body.appendChild($$('.label', {text: 'Email', contenteditable: false}));
    var emailView = this.childViews["email"] = new TextView(this.node, this.viewFactory, {property: "email"});
    body.appendChild(emailView.render().el);

    this.content.appendChild(body);

    return this;
  };

  this.onNodeUpdate = function(op) {
    if (op.path[1] === "name") {
      this.childViews["name"].onNodeUpdate(op);
      return true;
    } else if (op.path[1] === "organization") {
      this.childViews["organization"].onNodeUpdate(op);
      return true;
    } else if (op.path[1] === "email") {
      this.childViews["email"].onNodeUpdate(op);
      return true;
    } else {
      return false;
    }
  };


};

ContributorView.Prototype.prototype = NodeView.prototype;
ContributorView.prototype = new ContributorView.Prototype();

module.exports = ContributorView;
