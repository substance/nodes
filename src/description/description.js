"use strict";

var DocumentNode = require('../node/node');

var Description = function(node, document) {
  DocumentNode.call(this, node, document);
};

Description.type = {
  "id": "description",
  "parent": "content",
  "properties": {
    "source_id": "string",
    "topic": "string",
    "body": "paragraph"
  }
};

Description.description = {
  "name": "Description",
  "remarks": [
    "A Description consists of two components: a topic and its textual description."
  ],
  "properties": {
    "topic": "The entity to be described",
    "body": "A paragraph containing content which describe the topic",
  }
};

Description.example = {
  "type": "description",
  "id": "description_1",
  "topic": "Something",
  "body": "paragraph_2"
};

Description.Prototype = function() {

  this.getBody = function() {
    return this.document.get(this.properties.body);
  };

};

Description.Prototype.prototype = DocumentNode.prototype;
Description.prototype = new Description.Prototype();
Description.prototype.constructor = Description;

DocumentNode.defineProperties(Description.prototype, ["topic", "body"]);

module.exports = Description;
