"use strict";

// Note: for now, we have left the Text node implementation in substance-document
// as it is by the test-suite there, too.
// Later, we will try to extract helper methods, that makes it easier
// to implement custom textish nodes with annotation support.
var Document = require("substance-document");
module.exports = Document.TextNode;
