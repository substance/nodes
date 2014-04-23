"use strict";

var DocumentNode = require("../node/node");
var _ = require("underscore");

var Audio = function(node, document) {
  DocumentNode.call(this, node, document);
};

Audio.type = {
  "id": "audio",
  "parent": "content",
  "properties": {
    "files": ["array", "file"],
    "caption": "paragraph"
  }
};

Audio.description = {
  "name": "Audio",
  "remarks": [
    "A web video."
  ],
  "properties": {
    "files": "An array of different video files (MP3, WAV)",
    "caption": "A reference to a paragraph that describes the audio piece",
  }
};

// Example Audio
// -----------------
//

Audio.example = {
  "id": "audio",
  "label": "Audio",
  "files": ["song1.mp3"],
  "caption": "text_1"
};

Audio.Prototype = function() {

  this.hasCaption = function() {
    return (!!this.properties.caption);
  };

  this.getCaption = function() {
    if (this.properties.caption) return this.document.get(this.properties.caption);
  };

  this.getAudioFiles = function() {
    return _.map(this.properties.files, function(audioId) {
      return this.document.get(audioId);
    }, this);
  };
};

Audio.Prototype.prototype = DocumentNode.prototype;
Audio.prototype = new Audio.Prototype();
Audio.prototype.constructor = Audio;

Audio.prototype.defineProperties();


module.exports = Audio;
