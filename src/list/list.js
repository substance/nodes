"use strict";

var _ = require("underscore");
var DocumentNode = require('../node/node');

var List = function(node, document) {
  DocumentNode.call(this, node, document);
};

List.type = {
  "id": "list",
  "parent": "content",
  "properties": {
    "source_id": "string",
    "items": ["array", "list_item"],
    "ordered": "boolean"
  }
};


// This is used for the auto-generated docs
// -----------------
//

List.description = {
  "name": "List",
  "remarks": [
    "Lists can either be numbered or bullet lists"
  ],
  "properties": {
    "ordered": "Specifies wheter the list is ordered or not",
    "items": "An array of listitem references",
  }
};


// Example Formula
// -----------------
//

List.example = {
  "type": "list",
  "id": "list_1",
  "items ": [
    "listitem_1",
    "listitem_2",
  ]
};

List.Prototype = function() {

  this.getItems = function() {
    return _.map(this.properties.items, function(id) {
      return this.document.get(id);
    }, this);
  };

};

List.Prototype.prototype = DocumentNode.prototype;
List.prototype = new List.Prototype();
List.prototype.constructor = List;

List.prototype.defineProperties();

module.exports = List;
