var _ = require('underscore');
var DocumentNode = require('../node/node');


// Substance.InterviewSubject
// -----------------
//

var InterviewSubject = function(node, doc) {
  DocumentNode.call(this, node, doc);
};


// Type definition
// -----------------
//

InterviewSubject.type = {
  "id": "interview_subject",
  "parent": "content",
  "properties": {
    "source_id": "string",
    "name": "string", // full subject name
    "role": "string",
    "description": "string",
    "forced_labor": "string",
    "categories": ["array", "string"],
    "prisons": ["array", "location"],
    "movement": ["array", "object"],
    "image": "file", // optional
    "email": "string",
    "contribution": "string"
  }
};


InterviewSubject.Prototype = function() {

  this.getBlob = function() {
    if (!this.properties.image) return null;
    var file = this.document.get(this.properties.image);
    if (!file) return null;
    return file.getBlob();
  };

  // Depending on wheter there is a blob it returns either the blob url or a regular image url
  // --------
  // 

  this.getUrl = function() {
    var blob = this.getBlob();
    if (blob) {
      return window.URL.createObjectURL(blob);
    } else {
      return this.properties.image_url;
    }
  };
};

InterviewSubject.Prototype.prototype = DocumentNode.prototype;
InterviewSubject.prototype = new InterviewSubject.Prototype();
InterviewSubject.prototype.constructor = InterviewSubject;

InterviewSubject.prototype.defineProperties();

// Property aliases
// ----

// Object.defineProperties(InterviewSubject.prototype, {
//   "header": {
//     get: function() { return this.properties.name; },
//     set: function() { throw new Error("This is a read-only alias property."); }
//   }
// });

module.exports = InterviewSubject;
