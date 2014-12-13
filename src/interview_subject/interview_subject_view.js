"use strict";

var NodeView = require("../node").View;
var $$ = require("substance-application").$$;
var TextView = require("../text/text_view");
var ArrayOperation = require("substance-operator").ArrayOperation;
var _ = require("underscore");

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

    // Movement
    // -------

    body.appendChild($$('.label', {text: 'Movement'}));
    this.movementEl = $$('.movement-entries');
    
    // Add entries
    _.each(this.node.movement, function(movementEntry) {
      var movementEntry = $$('.movement-entry', {
        children: [
          $$('.location-name', {text: movementEntry.location}),
          $$('input.density', {value: movementEntry.density}),
          $$('.remove', {html: '<i class="icon-remove-sign"/>' })
        ]
      });
      this.movementEl.appendChild(movementEntry);

    }, this);

    body.appendChild(this.movementEl);
    
    // manipulate movement data
    this.content.appendChild(body);

    return this;
  };

  this.addMovementEntry = function() {
    // Alternatively rewrite whole array
    // this.node.document.set([this.node.id, "movement"], [{"location": "foo", "density": 2}]);

    // var arrayOp = ["+", 2, {"location": "foo", "density": 2}];
    var arrayOp = ArrayOperation.Push(this.node.movement, {"location": "foo", "density": 2});
    this.node.document.update([this.node.id, "movement"], arrayOp);

    console.log('le movement AFTER:', this.node.movement);
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
