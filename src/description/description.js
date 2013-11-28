"use strict";

var DocumentNode = require('../node/node');
var Composite = require('../composite/composite');

var Description = function(node, document) {
  Composite.call(this, node, document);
};

Description.type = {
  "id": "description",
  "parent": "content",
  "properties": {
    "source_id": "string",
    "topic": "text",
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
  "topic": "text_1",
  "body": "paragraph_2"
};

Description.Prototype = function() {

  this.getLength = function() {
    return 2;
  };

  this.getNodes = function() {
    return [this.properties.topic, this.properties.body];
  };

  this.getTopic = function() {
    return this.document.get(this.properties.topic);
  };

  this.getBody = function() {
    return this.document.get(this.properties.body);
  };

};

Description.Prototype.prototype = Composite.prototype;
Description.prototype = new Description.Prototype();
Description.prototype.constructor = Description;

DocumentNode.defineProperties(Description.prototype, ["topic", "body"]);

module.exports = Description;
