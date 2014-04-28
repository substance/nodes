"use strict";

var DocumentNode = require("../node/node");
var _ = require("underscore");

var Video = function(node, document) {
  DocumentNode.call(this, node, document);
};

Video.type = {
  "id": "video",
  "parent": "content",
  "properties": {
    "poster": ["file"],
    "files": ["array", "file"],
    "caption": "paragraph"
  }
};

Video.description = {
  "name": "Video",
  "remarks": [
    "A web video."
  ],
  "properties": {
    "poster": "Video placeholder",
    "files": "An array of different video files (MP4, OGV)",
    "caption": "A reference to a paragraph that describes the video",
  }
};


// Example Video
// -----------------
//

Video.example = {
  "id": "video",
  "label": "Video",
  "files": ["video1.mp4"],
  "caption": "text_1"
};

Video.Prototype = function() {

  this.hasCaption = function() {
    return (!!this.properties.caption);
  };

  this.getCaption = function() {
    if (this.properties.caption) return this.document.get(this.properties.caption);
  };


  this.getVideoFiles = function() {
    return _.map(this.properties.files, function(videoId) {
      return this.document.get(videoId);
    }, this);
  };

};

Video.Prototype.prototype = DocumentNode.prototype;
Video.prototype = new Video.Prototype();
Video.prototype.constructor = Video;

Video.prototype.defineProperties();


module.exports = Video;
