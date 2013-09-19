"use strict";

var Document = require("substance-document");
var DocumentNode = Document.Node;
var Composite = Document.Composite;

var Table = function(node, document) {
  Composite.call(this, node, document);
};

Table.type = {
  "id": "table",
  "parent": "content",
  "properties": {
    "source_id": "string",
    "items": ["array", "array", "content"]
  }
};


// This is used for the auto-generated docs
// -----------------
//

Table.description = {
  "name": "Table",
  "remarks": [],
  "properties": {
    "items": "An array of references which contain the content of each cell",
  }
};


// Example Formula
// -----------------
//

Table.example = {
  "type": "list",
  "id": "list_1",
  "items ": [
    ["cell_1_1", "cell_1_2"],
    ["cell_2_1", "cell_2_2"]
  ]
};

Table.Prototype = function() {

  this.getLength = function() {
    var l = 0;
    for (var row = 0; row < this.properties.items.length; row++) {
      var tableRow = this.properties.items[row];
      l += tableRow.length;
    }
    return l;
  };

  this.getNodes = function() {
    var ids = [];
    for (var row = 0; row < this.properties.items.length; row++) {
      var tableRow = this.properties.items[row];
      ids = ids.concat(tableRow);
    }
    return ids;
  };

  this.getItems = function() {
    var children = [];
    for (var i = 0; i < this.properties.items.length; i++) {
      var rowIds = this.properties.items[i];
      var row = [];
      for (var j = 0; j < rowIds.length; j++) {
        row.push(this.document.get(rowIds[j]));
      }
      children.push(row);
    }
    return children;
  };

  this.getChangePosition = function(/*op*/) {
    // TODO: map to the corresponding cell
    return -1;
  };

  this.isMutable = function() {
    return false;
  };

  this.canJoin = function(/*other*/) {
    return false;
  };

  this.isBreakable = function() {
    return false;
  };

};

Table.Prototype.prototype = Composite.prototype;
Table.prototype = new Table.Prototype();
Table.prototype.constructor = Table;

DocumentNode.defineProperties(Table.prototype, ["items"]);

module.exports = Table;
