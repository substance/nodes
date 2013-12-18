"use strict";

var _ = require("underscore");
var DocumentNode = require("../node/node");

var Table = function(node, document) {
  DocumentNode.call(this, node, document);
};

Table.type = {
  "id": "table",
  "parent": "content",
  "properties": {
    "label": "string",
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
  "type": "table",
  "id": "table_1",
  "headers": ["text_1", "text_2"],
  "cells": [
    ["cell_1_1", "cell_1_2"],
    ["cell_2_1", "cell_2_2"]
  ]
};

Table.Prototype = function() {

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
  };

};

Table.Prototype.prototype = DocumentNode.prototype;
Table.prototype = new Table.Prototype();
Table.prototype.constructor = Table;

Table.create = function(data) {
 var result = {};

  var tableId = data.id;
  var table = {
    id: tableId,
    type: "table",
    label: data.label,
    headers: [],
    cells: []
  };

  var id, node;
  if (data.headers) {
    for (var i = 0; i < data.headers.length; i++) {
      var h = data.headers[i];
      id = "th_" + i + "_" + tableId;
      node = {
        id: id,
        type: "text",
        content: h
      };
      result[id] = node;
      table.headers.push(id);
    }
  }

  for (var row = 0; row < data.cells.length; row++) {
    var rowData = data.cells[row];
    var tableRow = [];
    for (var col = 0; col < rowData.length; col++) {
      var cell = rowData[col];
      id = "td_" + "_" + row + "_" + col + "_" + tableId;
      node = {
        id: id,
        type: "text",
        content: cell
      };
      result[id] = node;
      tableRow.push(id);
    }
    table.cells.push(tableRow);
  }

  if (data.caption) {
    id = "caption_"+ tableId;
    node = {
      id: id,
      type: "text",
      content: data.caption
    };
    result[id] = node;
    table.caption = id;
  }

  result[table.id] = table;

  return result;
};

DocumentNode.defineProperties(Table.prototype, ["headers", "cells", "caption"]);

Object.defineProperties(Table.prototype, {
  // Used as a resource header
  header: {
    get: function() { return this.properties.label; }
  }
});

module.exports = Table;
