"use strict";

var Annotation = require('../annotation/annotation');

var CollaboratorReference = function(node, document) {
  Annotation.call(this, node, document);
};


// Type definition
// --------

CollaboratorReference.type = {
  "id": "collaborator_reference",
  "parent": "annotation",
  "properties": {
    "target": "collaborator"
  }
};

// This is used for the auto-generated docs
// -----------------
//

CollaboratorReference.description = {
  "name": "CollaboratorReference",
  "remarks": [
    "References a range in a text-ish node and references a collaborator node."
  ],
  "properties": {

  }
};

// Example CollaboratorReference annotation
// -----------------
//

CollaboratorReference.example = {
  "type": "collaborator_reference_1",
  "id": "collaborator_reference_1",
  "path": [
    "cover",
    "authors",
    "1"
  ],
  "range": [
    85,
    95
  ]
};

CollaboratorReference.Prototype = function() {};
CollaboratorReference.Prototype.prototype = Annotation.prototype;
CollaboratorReference.prototype = new CollaboratorReference.Prototype();
CollaboratorReference.prototype.constructor = CollaboratorReference;

CollaboratorReference.prototype.defineProperties();

module.exports = CollaboratorReference;
