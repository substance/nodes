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
    "headers": ["array", "content"],
    "cells": ["array", "array", "content"],
    "caption": "content"
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
  "headers": ["text_1", "text_2"],
  "cells": [
    ["cell_1_1", "cell_1_2"],
    ["cell_2_1", "cell_2_2"]
  ]
};

Table.Prototype = function() {

  this.getLength = function() {
    var l = 0;
    l += this.properties.headers.length;
    for (var row = 0; row < this.properties.cells.length; row++) {
      var tableRow = this.properties.cells[row];
      l += tableRow.length;
    }
    if (this.properties.caption) {
      l += 1;
    }

    return l;
  };

  this.getNodes = function() {
    var ids = [];
    for (var col = 0; col < this.properties.headers.length; col++) {
      ids.push(this.properties.headers[col]);
    }
    for (var row = 0; row < this.properties.cells.length; row++) {
      var tableRow = this.properties.cells[row];
      ids = ids.concat(tableRow);
    }
    if (this.properties.caption) {
      ids.push(this.properties.caption);
    }
    return ids;
  };

  this.getHeaders = function() {
    return _.map(this.properties.headers, function(id) {
      return this.document.get(id);
    }, this);
  };

  this.getCells = function() {
    var children = [];
    for (var i = 0; i < this.properties.cells.length; i++) {
      var rowIds = this.properties.cells[i];
      var row = [];
      for (var j = 0; j < rowIds.length; j++) {
        row.push(this.document.get(rowIds[j]));
      }
      children.push(row);
    }
    return children;
  };

  this.getCaption = function() {
    var caption;
    if (this.properties.caption) {
      caption = this.document.get(this.properties.caption);
    }
    return caption;
  }

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

DocumentNode.defineProperties(Table.prototype, ["headers", "cells", "caption"]);

module.exports = Table;
