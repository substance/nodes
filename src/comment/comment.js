"use strict";

var Annotation = require('../annotation/annotation');
var _ = require('underscore');

var Comment = function(node, document) {
  Annotation.call(this, node, document);
};

// Type definition
// --------

Comment.type = {
  "id": "comment",
  "properties": {
    "issue": "issue",
    "content": "string",
    "created_at": "string", // should be date
    "creator": "string"
  }
};

// This is used for the auto-generated docs
// -----------------
//

Comment.description = {
  "name": "Comment",
  "remarks": [
    "A user comment that sticks on an issue."
  ],
  "properties": {
    "issue": "Issue Reference",
    "content": "Comment content",
    "created_at": "Creation date/time",
    "creator": "The comment creator"
  }
};


// Example Comment annotation
// -----------------
//

Comment.example = {
  "type": "comment_1",
  "id": "comment_1",
  "issue": "issue_1",
  "content": "Hi, I am a comment.",
  "created_at": "2013-12-23T10:56:40.896Z",
  "creator": "John Doe"
};

Comment.Prototype = function() {};

Comment.Prototype.prototype = Annotation.prototype;
Comment.prototype = new Comment.Prototype();


// Getters and setters
// -----------------
//

var getters = {};

_.each(Comment.type.properties, function(prop, key) {
  getters[key] = {
    get: function() {
      return this.properties[key];
    },
    set: function(value) {
      this.properties[key] = value;
      return this;
    }
  };
});

Object.defineProperties(Comment.prototype, getters);

Comment.prototype.constructor = Comment;

module.exports = Comment;
