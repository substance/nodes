"use strict";

var Annotation = require('../annotation/annotation');
var _ = require("underscore");

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



var getters = {};

_.each(CollaboratorReference.type.properties, function(prop, key) {
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

Object.defineProperties(CollaboratorReference.prototype, getters);


CollaboratorReference.prototype.constructor = CollaboratorReference;

module.exports = CollaboratorReference;
