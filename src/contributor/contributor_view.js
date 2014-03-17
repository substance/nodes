"use strict";

var NodeView = require("../node").View;
var $ = window.$;
var $$ = require("substance-application").$$;
var TextView = require("../text/text_view");

// Substance.Contributor.View
// ==========================================================================

var ContributorView = function(node) {
  NodeView.call(this, node);

  this.$el.attr({id: node.id});
  this.$el.addClass("content-node contributor");
};

ContributorView.Prototype = function() {

  // Render it
  // --------
  //

  this.render = function() {
    NodeView.prototype.render.call(this);

    // Name element (used as a header for the resource card)
    // -------

    this.nameView = new TextView(this.node, this.viewFactory, {property: "name"});
    $(this.nameView.el).addClass('toggle-resource');
    this.content.appendChild(this.nameView.render().el);

    // Resource Body
    // -------
    //
    // Wraps all the contents of the resource card

    var body = $$('.resource-body');

    // Image
    // -------

    var url = this.node.image || this.node.image_url;

    if (url) {
      this.imageEl = $$('.image', {
        children: [$$('img', {src: url})]
      });
      body.appendChild(this.imageEl);
    }

    // Organization
    // -------

    this.organizationView = new TextView(this.node, this.viewFactory, {property: "organization"});
    body.appendChild(this.organizationView.render().el);


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
    this.emailView = new TextView(this.node, this.viewFactory, {property: "email"});
    body.appendChild(this.emailView.render().el);

    this.content.appendChild(body);

    return this;
  };

  this.dispose = function() {
    NodeView.dispose.call(this);
    this.nameView.dispose();
    this.organization.dispose();
    this.emailView.dispose();
  };


};

ContributorView.Prototype.prototype = NodeView.prototype;
ContributorView.prototype = new ContributorView.Prototype();

module.exports = ContributorView;
