"use strict";

var NodeView = require("../node").View;

var DescriptionView = function(node, viewFactory) {
  NodeView.call(this, node, viewFactory);

  this.$el.addClass('description');
  this.$el.attr('id', this.node.id);
};

DescriptionView.Prototype = function() {

  this.render = function() {

    var content = document.createElement('div');
    content.className = 'content';

    var topicEl = document.createElement('div');
    topicEl.className = 'topic';
    var topicView = this.viewFactory.createView(this.node.getTopic());
    topicEl.appendChild(topicView.render().el);
    this._topicEl = topicEl;

    var bodyEl = document.createElement('div');
    bodyEl.className = 'body';
    var bodyView = this.viewFactory.createView(this.node.getBody());
    bodyEl.appendChild(bodyView.render().el);
    this._bodyEl = bodyEl;

    content.appendChild(topicEl);
    content.appendChild(bodyEl);

    this.el.appendChild(content);

    return this;
  };

};

DescriptionView.Prototype.prototype = NodeView.prototype;
DescriptionView.prototype = new DescriptionView.Prototype();

module.exports = DescriptionView;
