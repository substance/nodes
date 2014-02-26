"use strict";

var Test = require('substance-test');
var assert = Test.assert;
var registerTest = Test.registerTest;


var TextNodeTest = function () {

  this.setup = function() {
  };

  this.actions = [
  ];

};

registerTest(['Substance.Nodes', 'TextNode'], new TextNodeTest());
