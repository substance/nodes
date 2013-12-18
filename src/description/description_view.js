"use strict";

var $$ = require("substance-application").$$;
var NodeView = require("../node/node_view");

var DescriptionView = function(node, viewFactory) {
  NodeView.call(this, node, viewFactory);

  this.$el.addClass('description');
  this.$el.attr('id', this.node.id);

  this.childViews = {
    "topic": null,
    "body": null
  };
};

DescriptionView.Prototype = function() {

  this.render = function() {
    NodeView.prototype.render.call(this);

    var topicEl = $$(".topic");
    var topicView = this.childViews["topic"] = this.viewFactory.createView(this.node.getTopic());
    topicEl.appendChild(topicView.render().el);
    this.content.appendChild(topicEl);

    var bodyEl = $$(".body");
    var bodyView = this.childViews["body"] = this.viewFactory.createView(this.node.getBody());
    bodyEl.appendChild(bodyView.render().el);
    this.content.appendChild(bodyEl);

    return this;
  };

};

DescriptionView.Prototype.prototype = NodeView.prototype;
DescriptionView.prototype = new DescriptionView.Prototype();

module.exports = DescriptionView;
