"use strict";

var NodeView = require("../node").View;
var $$ = require("substance-application").$$;
var TextView = require("../text/text_view");

// Substance.InterviewSubject.View
// ==========================================================================

var InterviewSubjectView = function(node) {
  NodeView.call(this, node);

  this.$el.attr({id: node.id});
  this.$el.addClass("content-node contributor interview-subject");
};

InterviewSubjectView.Prototype = function() {

  // Render it
  // --------
  //

  this.render = function() {
    NodeView.prototype.render.call(this);

    // Contributor role
    // -------

    this.roleEl = $$('.contributor-role', {text: this.node.role});
    this.content.appendChild(this.roleEl);

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


    // body.appendChild(this.imageEl);

    // Description
    // -------

    body.appendChild($$('.label', {text: 'Biography'}));
    this.descriptionView = new TextView(this.node, this.viewFactory, {property: "description"});
    body.appendChild(this.descriptionView.render().el);

    // Forced Labor
    // -------

    body.appendChild($$('.label', {text: 'Forced labor'}));
    this.forcedLaborEl = $$('.forced-labor.node-property', {text: this.node.forced_labor});
    body.appendChild(this.forcedLaborEl);

    // Categories
    // -------

    body.appendChild($$('.label', {text: 'Categories'}));
    this.categoriesEl = $$('.categories.node-property', {text: this.node.categories.join(', ')});
    body.appendChild(this.categoriesEl);

    // Prisons
    // -------

    body.appendChild($$('.label', {text: 'Prisons'}));
    this.prisonsEl = $$('.prisons.node-property', {text: this.node.prisons.join(', ')});
    body.appendChild(this.prisonsEl);

    // Prisons
    // -------

    body.appendChild($$('.label', {text: 'Movement'}));
    this.movementEl = $$('.movement.node-property', {text: this.node.movement.join(', ')});
    body.appendChild(this.movementEl);

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
    this.descriptionView.dispose();
  };
};

InterviewSubjectView.Prototype.prototype = NodeView.prototype;
InterviewSubjectView.prototype = new InterviewSubjectView.Prototype();

module.exports = InterviewSubjectView;
