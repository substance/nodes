"use strict";

var IssueView = require("../issue/issue_view");

var RemarkView = function(node, viewFactory) {
  IssueView.call(this, node, viewFactory);
};

RemarkView.Prototype = function() {

};

RemarkView.Prototype.prototype = IssueView.prototype;
RemarkView.prototype = new RemarkView.Prototype();

module.exports = RemarkView;
