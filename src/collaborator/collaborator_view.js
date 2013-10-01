"use strict";

var _ = require("underscore");
var util = require("substance-util");
var html = util.html;
var NodeView = require("../node").View;
var $$ = require("substance-application").$$;

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

    // Image
    // -------

    if (this.node.image) {
      this.content.appendChild($$('img', {src: this.node.image}));
    }


    // Organization
    // -------

    this.content.appendChild($$('.label', {text: 'Organization'}));
    this.content.appendChild($$('.organization', {
      children: [$$('a', {href: this.node.organization, text: this.node.organization})]
    }));

    // Contribution
    // -------

    this.content.appendChild($$('.label', {text: 'Contribution'}));
    this.content.appendChild($$('.contribution', {text: this.node.contribution}));


    // Email
    // -------

    this.content.appendChild($$('.label', {text: 'Email'}));
    this.content.appendChild($$('.email', {
      children: [$$('a', {href: this.node.email, text: this.node.email})]
    }));



    return this;
  };

};

CollaboratorView.Prototype.prototype = NodeView.prototype;
CollaboratorView.prototype = new CollaboratorView.Prototype();

module.exports = CollaboratorView;
