"use strict";

var _ = require("underscore");
var TextNode = require('../text/text_node');

var ListItem = function(node, document) {
  TextNode.call(this, node, document);
};

ListItem.type = {
  "id": "list_item",
  "parent": "content",
  "properties": {
    "level": "number",
    "content": "string"
  }
};


// This is used for the auto-generated docs
// -----------------
//

ListItem.description = {
  "name": "ListItem",
  "remarks": [
    "ListItems have a level of nesting."
  ],
  "properties": {
    "level": "Specifies the indentation level",
    "content": "The item's content",
  }
};


// Example Formula
// -----------------
//

ListItem.example = {
  "type": "list_item",
  "id": "list_item_1",
  "level": 1,
  "content": "This is item 1"
};

ListItem.Prototype = function() {
};

ListItem.Prototype.prototype = TextNode.prototype;;
ListItem.prototype = new ListItem.Prototype();
ListItem.prototype.constructor = ListItem;

ListItem.prototype.defineProperties();

module.exports = ListItem;
