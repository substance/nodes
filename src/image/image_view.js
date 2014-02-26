"use strict";

var NodeView = require("../node/node");
var $$ = require ("substance-application").$$;

// Substance.Image.View
// ==========================================================================

var ImageView = function(node, viewFactory) {
  NodeView.call(this, node, viewFactory);

  this.$el.addClass('image');
  this.$el.attr('id', this.node.id);
};

ImageView.Prototype = function() {

  // Render Markup
  // --------
  //
  // div.content
  //   div.img-char
  //     .img

  this.render = function() {
    NodeView.prototype.render.call(this);

    var imgCharEl = this.imgCharEl = $$(".image-char");
    var img = $$('img',
      {
        src: this.node.url,
        alt: "alt text",
        title: "alt text",
      }
    );
    imgCharEl.appendChild(img);
    this.content.appendChild(imgCharEl);

    return this;
  };

  this.delete = function(pos, length) {
    var content = this.$('.content')[0];
    var spans = content.childNodes;
    for (var i = length - 1; i >= 0; i--) {
      content.removeChild(spans[pos+i]);
    }
  };
};

ImageView.Prototype.prototype = NodeView.prototype;
ImageView.prototype = new ImageView.Prototype();

module.exports = ImageView;
