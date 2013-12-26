"use strict";

var Issue = require('../issue/issue');

var Question = function(node, document) {
  Issue.call(this, node, document);
};

// Type definition
// --------

Question.type = {
  "id": "question",
  "parent": "issue",
  "properties": {
  }
};

// This is used for the auto-generated docs
// -----------------
//

Question.description = {
  "name": "Question",
  "remarks": [
    "References a range in a text-ish node and tags it as emphasized"
  ],
  "properties": {
  }
};


// Example Question annotation
// -----------------
//

Question.example = {
  "type": "question",
  "id": "question_1",
  "path": [
    "text_54",
    "content"
  ],
  "range": [
    85,
    95
  ]
};

Question.Prototype = function() {};

Question.Prototype.prototype = Issue.prototype;
Question.prototype = new Question.Prototype();
Question.prototype.constructor = Question;

module.exports = Question;