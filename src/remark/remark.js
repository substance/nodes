"use strict";

var Issue = require('../issue/issue');

var Remark = function(node, document) {
  Issue.call(this, node, document);
};

// Type definition
// --------

Remark.type = {
  "id": "remark",
  "parent": "issue",
  "properties": {
  }
};

// This is used for the auto-generated docs
// -----------------
//

Remark.description = {
  "name": "Remark",
  "remarks": [
    "References a range in a text-ish node and tags it as emphasized"
  ],
  "properties": {
  }
};

// Example Remark annotation
// -----------------
//

Remark.example = {
  "type": "remark",
  "id": "remark_1",
  "title": "Can you explain?",
  "description": "I don't get the argument here."
};

Remark.Prototype = function() {};

Remark.Prototype.prototype = Issue.prototype;
Remark.prototype = new Remark.Prototype();
Remark.prototype.constructor = Remark;

module.exports = Remark;
