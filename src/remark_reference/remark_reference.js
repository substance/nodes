"use strict";

var Annotation = require('../annotation/annotation');
var _ = require('underscore');

var RemarkReference = function(node, document) {
  Annotation.call(this, node, document);
};

// Type definition
// --------

RemarkReference.type = {
  "id": "remark_reference",
  "parent": "annotation",
  "properties": {
    "target": "remark"
  }
};

// This is used for the auto-generated docs
// -----------------
//

RemarkReference.description = {
  "name": "RemarkReference",
  "remarks": [
    "References a range in a text-ish node and references a remark"
  ],
  "properties": {
    "target": "Referenced remark id"
  }
};


// Example RemarkReference annotation
// -----------------
//

RemarkReference.example = {
  "type": "remark_reference_1",
  "id": "remark_reference_1",
  "path": [
    "text_54",
    "content"
  ],
  "range": [
    85,
    95
  ]
};

RemarkReference.Prototype = function() {};

RemarkReference.Prototype.prototype = Annotation.prototype;
RemarkReference.prototype = new RemarkReference.Prototype();


var getters = {};

_.each(RemarkReference.type.properties, function(prop, key) {
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

Object.defineProperties(RemarkReference.prototype, getters);

RemarkReference.prototype.constructor = RemarkReference;

module.exports = RemarkReference;