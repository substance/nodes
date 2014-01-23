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
};

ContributorView.Prototype = function() {

  // Render it
  // --------
  //

  this.render = function() {
    NodeView.prototype.render.call(this);


    // Name element (used as a header for the resource card)
    // -------

    var nameView = new TextView(this.node, this.viewFactory, {property: "name"});
    $(nameView.el).addClass('toggle-resource');
    this.content.appendChild(nameView.render().el);

    // Delete Button
    // --------
    // 
    // This should be attached by the writer, since we don't want to have a
    // delete button in a reading scenario

    var deleteButton = $$('a.delete-resource', {
      href: '#',
      text: "Delete",
      contenteditable: false
    });

    nameView.el.appendChild(deleteButton);

    // Resource Body
    // -------
    // 
    // Wraps all the contents of the resource card

    var body = $$('.resource-body');

    // Image
    // -------

    if (this.node.image) {
      this.imageEl = $$('.image', {
        contenteditable: false,
        children: [$$('img', {src: this.node.image})]
      });
      body.appendChild(this.imageEl);
    }

    // Organization
    // -------

    // this.content.appendChild($$('.label', {text: 'Organization'}));
    if (this.node.organization) {
      this.orgEl = $$('.organization.node-property',{text: this.node.organization, "data-path": "organization"});
      body.appendChild(this.orgEl);
    }


    // Contribution
    // -------

    if (this.node.contribution) {
      body.appendChild($$('.label', {text: 'Contribution'}));
      this.contribEl = $$('.contribution.node-property', {text: this.node.contribution, "data-path": "contribution"});
      body.appendChild(this.contribEl);
    }


    // Email
    // -------

    if (this.node.email) {
      body.appendChild($$('.label', {text: 'Email'}));
      this.emailEl = $$('.email.node-property', {
        children: [$$('a', {href: "mailto:"+ this.node.email, text: this.node.email})],
        "data-path": "email"
      });
      body.appendChild(this.emailEl);
    }

    this.content.appendChild(body);

    return this;
  };

  this.describeStructure = function() {
    var structure = [];
    structure.push(this.propertyComponent("organization", this.orgEl));
    structure.push(this.propertyComponent("contribution", this.contribEl));
    structure.push(this.propertyComponent("email", this.emailEl));
    return structure;
  };
};

ContributorView.Prototype.prototype = NodeView.prototype;
ContributorView.prototype = new ContributorView.Prototype();

module.exports = ContributorView;
