"use strict";

var Text = require("../text/text_node");

var CodeBlock = function(node, document) {
  Text.call(this, node, document);
};

// Type definition
// --------

CodeBlock.type = {
  "id": "code_block",
  "parent": "content",
  "properties": {
    "source_id": "string",
    "content": "string"
  }
};

CodeBlock.config = {
  "zoomable": true
};

// This is used for the auto-generated docs
// -----------------
//

CodeBlock.description = {
  "name": "CodeBlock",
  "remarks": [
    "Text in a codeblock is displayed in a fixed-width font, and it preserves both spaces and line breaks"
  ],
  "properties": {
    "content": "Content",
  }
};


// Example Formula
// -----------------
//

CodeBlock.example = {
  "type": "code_block",
  "id": "code_block_1",
  "content": "var text = \"Sun\";\nvar op1 = Operator.TextOperation.Delete(2, \"n\");\ntext = op2.apply(op1.apply(text));\nconsole.log(text);",
};

CodeBlock.Prototype = function() {};

CodeBlock.Prototype.prototype = Text.prototype;
CodeBlock.prototype = new CodeBlock.Prototype();
CodeBlock.prototype.constructor = CodeBlock;

CodeBlock.prototype.defineProperties();

module.exports = CodeBlock;

