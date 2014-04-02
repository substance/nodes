"use strict";

module.exports = {
  "node": require("./src/node"),
  "text": require("./src/text"),
  "document": require("./src/document"),
  "heading": require("./src/heading"),
  "codeblock": require("./src/codeblock"),
  "image": require("./src/image"),
  "figure": require("./src/figure"),
  "contributor": require("./src/contributor"),
  "cover": require("./src/cover"),
  "citation": require("./src/citation"),
  "annotation": require("./src/annotation"),
  "emphasis": require("./src/emphasis"),
  "strong": require("./src/strong"),
  "subscript": require("./src/subscript"),
  "superscript": require("./src/superscript"),
  "code": require("./src/code"),
  "webpage": require("./src/webpage"),
  "list_item": require("./src/list_item"),
  "math": require("./src/math"),
  "issue": require("./src/issue"),
  "remark": require("./src/remark"),
  "error": require("./src/error"),
  "file": require("./src/file"),
  // "block_reference": require("./src/block_reference"),
  "figure_reference": require("./src/figure_reference"),
  "citation_reference": require("./src/citation_reference"),
  "cross_reference": require("./src/cross_reference"),
  "remark_reference": require("./src/remark_reference"),
  "error_reference": require("./src/error_reference"),

  // deprecated: these node types will be re-implemented
  "paragraph": require("./src/paragraph"),
  "table": require("./src/table"),
  "formula": require("./src/formula")
};
