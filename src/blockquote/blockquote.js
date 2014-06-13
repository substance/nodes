"use strict";

var Text = require("../text/text_node");

var Blockquote = function(node, document) {
  Text.call(this, node, document);
};

// Type definition
// -----------------
//

Blockquote.type = {
  "id": "blockquote",
  "parent": "content",
  "properties": {
    "source_id": "string",
    "content": "string",
    "level": "number"
  }
};

// Example Blockquote
// -----------------
//

Blockquote.example = {
  "type": "blockquote",
  "id": "blockquote_1",
  "content": "Introduction"
};

// This is used for the auto-generated docs
// -----------------
//

Blockquote.description = {
  "name": "Blockquote",
  "remarks": [
    "Denotes a blockquote."
  ],
  "properties": {
    "content": "Blockquote content"
  }
};

Blockquote.Prototype = function() {
  this.splitInto = 'paragraph';
};

Blockquote.Prototype.prototype = Text.prototype;
Blockquote.prototype = new Blockquote.Prototype();
Blockquote.prototype.constructor = Blockquote;

Blockquote.prototype.defineProperties();

module.exports = Blockquote;
