"use strict";

var IssueView = require("../issue/issue_view");

var ErrorView = function(node, viewFactory) {
  IssueView.call(this, node, viewFactory);
};

ErrorView.Prototype = function() {

};

ErrorView.Prototype.prototype = IssueView.prototype;
ErrorView.prototype = new ErrorView.Prototype();

module.exports = ErrorView;
