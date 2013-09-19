"use strict";

var CompositeView = require("../composite/composite_view");

// TableView
// =========

var TableView = function(node, viewFactory) {
  CompositeView.call(this, node, viewFactory);
};

TableView.Prototype = function() {

  // Rendering
  // =============================
  //

  this.render = function() {
    this.el.innerHTML = "";
    this.content = document.createElement("table");
    this.content.classList.add("content");

    // dispose existing children views if called multiple times
    for (var i = 0; i < this.childrenViews.length; i++) {
      this.childrenViews[i].dispose();
    }

    var tableItems = this.node.getItems();
    for (var row = 0; row < tableItems.length; row++) {
      var tableRow = tableItems[row];

      var rowEl = document.createElement("tr");
      for (var col = 0; col < tableRow.length; col++) {
        var cellNode = tableRow[col];
        var cellView = this.viewFactory.createView(cellNode);
        var tdEl = this.document.createElement("td");
        tdEl.appendChild(cellView.render().el);
        rowEl.appendChild(tdEl);

        this.childrenViews.push(cellView);
      }

      this.content.appendChild(rowEl);
    }

    this.el.appendChild(this.content);
    return this;
  };

  this.onNodeUpdate = function(op) {
    if (op.path[0] === this.node.id && op.path[1] === "items") {
      this.render();
    }
  };
};

TableView.Prototype.prototype = CompositeView.prototype;
TableView.prototype = new TableView.Prototype();
TableView.prototype.constructor = TableView;

module.exports = TableView;
