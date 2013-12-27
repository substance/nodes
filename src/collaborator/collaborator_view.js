"use strict";

var NodeView = require("../node").View;
var $$ = require("substance-application").$$;
var TextView = require("../text/text_view");

// Substance.Collaborator.View
// ==========================================================================

var CollaboratorView = function(node) {
  NodeView.call(this, node);

  this.$el.attr({id: node.id});
  this.$el.addClass("content-node collaborator");
};

CollaboratorView.Prototype = function() {

  // Render it
  // --------
  //

  this.render = function() {
    NodeView.prototype.render.call(this);

    var nameView = new TextView(this.node, this.viewFactory, {property: "name"});
    this.content.appendChild(nameView.render().el);

    // Image
    // -------

    if (this.node.image) {
      this.imageEl = $$('.image', {
        children: [$$('img', {src: this.node.image})]
      });
      this.content.appendChild(this.imageEl);
    }

    // Organization
    // -------

    // this.content.appendChild($$('.label', {text: 'Organization'}));
    if (this.node.organization) {
      this.orgEl = $$('.organization.node-property',{text: this.node.organization, "data-path": "organization"});
      this.content.appendChild(this.orgEl);
    }


    // Contribution
    // -------

    if (this.node.contribution) {
      this.content.appendChild($$('.label', {text: 'Contribution'}));
      this.contribEl = $$('.contribution.node-property', {text: this.node.contribution, "data-path": "contribution"});
      this.content.appendChild(this.contribEl);
    }


    // Email
    // -------

    if (this.node.email) {
      this.content.appendChild($$('.label', {text: 'Email'}));
      this.emailEl = $$('.email.node-property', {
        children: [$$('a', {href: "mailto:"+ this.node.email, text: this.node.email})],
        "data-path": "email"
      });
      this.content.appendChild(this.emailEl);
    }

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

CollaboratorView.Prototype.prototype = NodeView.prototype;
CollaboratorView.prototype = new CollaboratorView.Prototype();

module.exports = CollaboratorView;
