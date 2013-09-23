"use strict";

var CompositeView = require("../composite/composite_view");

// TableView
// =========

var TableView = function(node, viewFactory) {
  CompositeView.call(this, node, viewFactory);
};

TableView.Prototype = function() {

  this.render = function() {
    this.el.innerHTML = "";
    this.content = document.createElement("div");
    this.content.classList.add("content");

    // dispose existing children views if called multiple times
    for (var i = 0; i < this.childrenViews.length; i++) {
      this.childrenViews[i].dispose();
    }

    var tableEl = document.createElement("table");

    // table header
    var cellNode, cellView;
    var tableHeaders = this.node.getHeaders();
    var thead = document.createElement("thead");
    if (tableHeaders.length > 0) {
      var rowEl = document.createElement("tr");
      for (var i = 0; i < tableHeaders.length; i++) {
        cellNode = tableHeaders[i];
        cellView = this.viewFactory.createView(cellNode);
        var cellEl = document.createElement("th");
        cellEl.appendChild(cellView.render().el);
        rowEl.appendChild(cellEl);

        this.childrenViews.push(cellView);
      };
      thead.appendChild(rowEl);
    }
    tableEl.appendChild(thead);

    // table rows
    var tableCells = this.node.getCells();
    var tbody = document.createElement("tbody");
    for (var row = 0; row < tableCells.length; row++) {
      var tableRow = tableCells[row];

      var rowEl = document.createElement("tr");
      for (var col = 0; col < tableRow.length; col++) {
        cellNode = tableRow[col];
        cellView = this.viewFactory.createView(cellNode);
        var cellEl = document.createElement("td");
        cellEl.appendChild(cellView.render().el);
        rowEl.appendChild(cellEl);

        this.childrenViews.push(cellView);
      }
      tbody.appendChild(rowEl);
    }
    tableEl.appendChild(tbody);

    this.content.appendChild(tableEl);

    // table caption
    if (this.node.caption) {
      var caption = this.node.getCaption();
      var captionView = this.viewFactory.createView(caption);
      var captionEl = captionView.render().el;
      captionEl.classList.add("caption");
      this.content.appendChild(captionEl);
      this.childrenViews.push(captionView);
    }

    this.el.appendChild(this.content);

    return this;
  };

  this.onNodeUpdate = function(op) {
    if (op.path[0] === this.node.id) {
      if (op.path[1] === "headers" || op.path[1] === "cells") {
        this.render();
      }
    }
  };
};

TableView.Prototype.prototype = CompositeView.prototype;
TableView.prototype = new TableView.Prototype();
TableView.prototype.constructor = TableView;

module.exports = TableView;
