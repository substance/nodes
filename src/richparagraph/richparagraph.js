"use strict";

var _ = require("underscore");
var Document = require("substance-document");
var DocumentNode = Document.Node;
var Composite = Document.Composite;

var RichParagraph = function(node, document) {
  Composite.call(this, node, document);
};

RichParagraph.type = {
  "id": "richparagraph",
  "parent": "content",
  "properties": {
    "children": ["array", "paragraph"],
  }
};


// This is used for the auto-generated docs
// -----------------
//

RichParagraph.description = {
  "name": "RichParagraph",
  "remarks": [
    "A RichParagraph can have inline elements such as images."
  ],
  "properties": {
    "children": "An array of node references",
  }
};


// Example
// -------
//

RichParagraph.example = {
  "type": "richparagraph",
  "id": "richparagraph_1",
  "children ": [
    "text_1",
    "image_1",
    "text_2",
  ]
};

RichParagraph.Prototype = function() {

  this.getLength = function() {
    return this.properties.children.length;
  };

  this.getNodes = function() {
    return _.clone(this.properties.children);
  };

  this.getChildren = function() {
    return _.map(this.properties.children, function(id) {
      return this.document.get(id);
    }, this);
  };

  this.getChangePosition = function(op) {
    if (op.path[1] === "children") {

      if (op.type === "update") {
        var diff = op.diff;
        if (diff.isInsert()) {
          return op.diff.pos+1;
        }
        else if (diff.isDelete()) {
          return op.diff.pos;
        }
        else if (diff.isMove()) {
          return op.diff.target;
        }
      }
      else if (op.type === "set") {
        return this.properties.children.length-1;
      }
    }

    return -1;
  };

  this.isMutable = function() {
    return true;
  };

  this.insertChild = function(doc, pos, nodeId) {
    doc.update([this.id, "children"], ["+", pos, nodeId]);
  };

  this.deleteChild = function(doc, nodeId) {
    var pos = this.children.indexOf(nodeId);
    doc.update([this.id, "children"], ["-", pos, nodeId]);
    doc.delete(nodeId);
  };

  this.canJoin = function(other) {
    return (other.type === "richparagraph");
  };

  this.isBreakable = function() {
    return true;
  };

  this.break = function(doc, childId, charPos) {
    var childPos = this.properties.children.indexOf(childId);
    if (childPos < 0) {
      throw new Error("Unknown child " + childId);
    }
    var child = doc.get(childId);
    var newNode = child.break(doc, charPos);
    doc.update([this.id, "children"], ["+", childPos+1, newNode.id]);
    return newNode;
  };

};

RichParagraph.Prototype.prototype = Composite.prototype;
RichParagraph.prototype = new RichParagraph.Prototype();
RichParagraph.prototype.constructor = RichParagraph;

DocumentNode.defineProperties(RichParagraph.prototype, ["children"]);

module.exports = RichParagraph;
