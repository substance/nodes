"use strict";

module.exports = {
  "node": {
    Model: require("./src/node/node"),
    View: require("./src/node/node_view")
  },
  "composite": {
    Model: require("./src/composite/composite"),
    View: require("./src/composite/composite_view")
  },
  "text": {
    Model: require("./src/text/text_node"),
    View: require("./src/text/text_view")
  },
  "paragraph": {
    Model: require("./src/paragraph/paragraph"),
    View: require("./src/paragraph/paragraph_view")
  },
  "heading": {
    Model: require("./src/heading/heading"),
    View: require("./src/heading/heading_view")
  },
  "list": {
    Model: require("./src/list/list"),
    View: require("./src/list/list_view")
  },
  "codeblock": {
    Model: require("./src/codeblock/codeblock"),
    View: require("./src/codeblock/codeblock_view")
  },
  "webresource": {
    Model: require("./src/web_resource/web_resource"),
    View: require("./src/web_resource/web_resource_view")
  },
  "image": {
    Model: require("./src/image/image"),
    View: require("./src/image/image_view")
  }
};
