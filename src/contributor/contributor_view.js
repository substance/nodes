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

    this.nameView = new TextView(this.node, this.viewFactory, {property: "name"});
    this.content.appendChild(this.nameView.render().el);

    // Resource Body
    // -------
    //
    // Wraps all the contents of the resource card

    var body = $$('.resource-body');

    // Image
    // -------

    this.imgEl = $$('img');
    this.updateImage();

    this.imageEl = $$('.image', {
      contenteditable: false,
      children: [
        this.imgEl
      ],
      'data-path': this.node.id+'.image'
    });

    body.appendChild(this.imageEl);

    // Description
    // -------

    this.descriptionView = new TextView(this.node, this.viewFactory, {property: "description"});
    body.appendChild(this.descriptionView.render().el);


    // Contribution
    // -------

    if (this.node.contribution) {
      body.appendChild($$('.label', {text: 'Contribution'}));
      this.contribEl = $$('.contribution.node-property', {text: this.node.contribution, "data-path": "contribution"});
      body.appendChild(this.contribEl);
    }

    this.content.appendChild(body);

    return this;
  };

  this.updateImage = function() {
    var url = this.node.getUrl() || "styles/contributor-image-placeholder.png";
    this.imgEl.setAttribute("src", url);
  };

  this.dispose = function() {
    NodeView.prototype.dispose.call(this);
    this.nameView.dispose();
    this.organization.dispose();
    this.emailView.dispose();
  };
};

ContributorView.Prototype.prototype = NodeView.prototype;
ContributorView.prototype = new ContributorView.Prototype();

module.exports = ContributorView;
