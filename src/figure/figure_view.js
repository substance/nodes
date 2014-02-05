"use strict";

var $$ = require ("substance-application").$$;
var NodeView = require("../node/node_view");
var TextView = require("../text/text_view");

// Substance.Figure.View
// ==========================================================================

var FigureView = function(node, viewFactory) {
  NodeView.call(this, node, viewFactory);

  this.childViews = {
    "label": null,
    "caption": null
  };
};


function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}

FigureView.Prototype = function() {

  // Rendering
  // =============================
  //

  this.render = function() {
    NodeView.prototype.render.call(this);

    var labelView = this.childViews["label"] = new TextView(this.node, this.viewFactory, {property: "label"});
    $(labelView.el).addClass('toggle-resource');
    this.content.appendChild(labelView.render().el);

    // Delete Button
    // --------

    var deleteButton = $$('a.delete-resource', {
      href: '#',
      text: "Delete",
      contenteditable: false // Make sure this is not editable!
    });

    labelView.el.appendChild(deleteButton);

    // Resource body
    // --------
    //
    // Wraps all resource details

    var bodyEl = $$('.resource-body');

    this.imgEl = $$("img", {href: "#"});

    // Prepares blobs etc. for the image
    
    // Add graphic (img element)
    this.imgWrapper = $$('.image-wrapper', {
      children: [
        $$("input.figure-image-file", {type: "file", name: "files", "data-id": this.node.id }),
        $$("a", {
          // href: url,
          title: "View image in full size",
          target: "_blank",
          children: [this.imgEl]
        })
      ]
    });

    bodyEl.appendChild(this.imgWrapper);

    this.updateImage();

    var caption = this.node.getCaption();
    if (caption) {
      var captionView = this.childViews["caption"] = this.viewFactory.createView(caption);
      var captionEl = captionView.render().el;
      captionEl.classList.add('caption');
      bodyEl.appendChild(captionEl);
    }

    this.content.appendChild(bodyEl);
    return this;
  };

  this.updateImage = function() {
    var url = this.node.getUrl();
    this.imgEl.setAttribute("src", url);

    this.$(this.imgWrapper).find('a').attr({
      url: url
    });
  };

  // Updates image src when figure is updated by ImageUrlEditor
  // --------
  //

  this.onNodeUpdate = function(op) {
    this.updateImage();
    this.childViews["label"].onNodeUpdate(op);
  };

};

FigureView.Prototype.prototype = NodeView.prototype;
FigureView.prototype = new FigureView.Prototype();

module.exports = FigureView;
