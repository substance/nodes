"use strict";

var $$ = require ("substance-application").$$;
var NodeView = require("../node").View;
// var TextView = require("../text").View;

var LocationView = function(node, viewFactory) {
  NodeView.call(this, node, viewFactory);

  // This class is shared among all link subtypes (errors, remarks)
  this.$el.addClass('location');

  this.childViews = {
    "title": null,
    "url": null,
    "description": null
  };
};

LocationView.Prototype = function() {

  var __super__ = NodeView.prototype;

  // Rendering
  // =============================
  //

  this.render = function() {
    NodeView.prototype.render.call(this);

    // Select citation page
    // --------

    // var titleView = this.childViews["title"] = new TextView(this.node, this.viewFactory, {property: "title"});  
    // this.content.appendChild(titleView.render().el);

    // var urlView = this.childViews["url"] = new TextView(this.node, this.viewFactory, {property: "url"});  
    // this.content.appendChild(urlView.render().el);

    // var selectButton = $$('.select-citation', {
    //   text: "",
    //   contenteditable: false // Make sure this is not editable!
    // });

    // urlView.el.appendChild(selectButton);

    // var deleteButton = $$('a.delete-resource', {
    //   href: '#',
    //   html: '<i class="icon-remove-sign"></i>',
    //   contenteditable: false // Make sure this is not editable!
    // });

    // this.content.appendChild(deleteButton);
    // var descriptionView = this.childViews["description"] = new TextView(this.node, this.viewFactory, {property: "description"});
    // this.content.appendChild(descriptionView.render().el);
    // this.el.appendChild($$('.resource-active'));

    var nameEl = $$('.name', {text: this.node.name});
    this.el.appendChild(nameEl);

    var synonymsEl = $$('.synonyms', {text: this.node.synonyms.join(', ')});
    this.el.appendChild(synonymsEl);

    // var nameView = $$('.name', {text: this.node.name});
    // this.el.appendChild(nameEl);

    return this;
  };

  this.onNodeUpdate = function(op) {
    // if (op.path[1] === "title") {
    //   this.childViews["title"].onNodeUpdate(op);
    //   return true;
    // } else if (op.path[1] === "description") {
    //   this.childViews["description"].onNodeUpdate(op);
    //   return true;
    // } else if (op.path[1] === "url") {
    //   this.childViews["url"].onNodeUpdate(op);
    //   return true;
    // } else {
    //   return false;
    // }
  };
};


LocationView.Prototype.prototype = NodeView.prototype;
LocationView.prototype = new LocationView.Prototype();

module.exports = LocationView;