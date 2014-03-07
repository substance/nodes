"use strict";

var $$ = require ("substance-application").$$;
var NodeView = require("../node/node_view");
var TextView = require("../text/text_view");

// Substance.BlockReference.View
// ==========================================================================

var BlockReference = function(node, viewFactory) {
  NodeView.call(this, node, viewFactory);
};

BlockReference.Prototype = function() {

  // Rendering
  // =============================
  //

  this.render = function() {
    NodeView.prototype.render.call(this);

    this.imgEl = $$('img', {src: "styles/image-placholder-line.png"});
    this.updateImage();

    // Add graphic (img element)
    this.imgWrapper = $$('.image-wrapper.toggle-resource', {
      contenteditable: false,
      children: [
        this.imgEl
      ]
    });

    this.content.appendChild(this.imgWrapper);
    return this;
  };

  this.updateImage = function() {
    var figure = this.node.getResource();
    var url = figure.getUrl() || "styles/image-placholder-line.png";
    this.imgEl.setAttribute("src", url);
  };


  // Updates image src when figure is updated by ImageUrlEditor
  // --------
  //

  this.onNodeUpdate = function(op) {
    this.updateImage();
  };

  this.onGraphUpdate = function(op) {
    if (NodeView.prototype.onGraphUpdate.call(this, op)) return;
    var resource = this.node.getResource();
    var fileId = resource.image;

    // When the image file is assigned the first time.. or when the corresponding file changed
    if (op.path[0] === resource.id || op.path[0] === fileId) {
      this.updateImage();
    }
  };

  this.dispose = function() {
    NodeView.prototype.dispose.call(this);
  };
};


BlockReference.Prototype.prototype = NodeView.prototype;
BlockReference.prototype = new BlockReference.Prototype();

module.exports = BlockReference;
