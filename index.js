"use strict";

module.exports = {
  "node": require("./src/node"),
  "text": require("./src/text"),
  "document": require("./src/document"),
  "container": require("./src/container"),
  "heading": require("./src/heading"),
  "blockquote": require("./src/blockquote"),
  "code_block": require("./src/code_block"),

  "figure": require("./src/figure"),
  "contributor": require("./src/contributor"),
  "interview_subject": require("./src/interview_subject"),
  "cover": require("./src/cover"),
  "citation": require("./src/citation"),
  "annotation": require("./src/annotation"),
  "emphasis": require("./src/emphasis"),
  "strong": require("./src/strong"),
  "subscript": require("./src/subscript"),
  "superscript": require("./src/superscript"),
  "code": require("./src/code"),
  "web_resource": require("./src/web_resource"),
  "video": require("./src/video"),
  "audio": require("./src/audio"),
  "web_page": require("./src/web_page"),
  "list_item": require("./src/list_item"),

  "issue": require("./src/issue"),
  "remark": require("./src/remark"),
  "error": require("./src/error"),
  "file": require("./src/file"),
  "license": require("./src/license"),

  "publication_info": require("./src/publication_info"),

  "figure_reference": require("./src/figure_reference"),
  "citation_reference": require("./src/citation_reference"),
  "cross_reference": require("./src/cross_reference"),
  "remark_reference": require("./src/remark_reference"),
  "error_reference": require("./src/error_reference"),

  // Archivist nodes
  "location_reference": require("./src/location_reference"),
  "person_reference": require("./src/person_reference"),
  "definition_reference": require("./src/definition_reference")
};