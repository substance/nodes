"use strict";

var $$ = require ("substance-application").$$;
var NodeView = require("../node/node_view");
var TextView = require("../text/text_view");


// Substance.Issue.View
// ==========================================================================

var IssueView = function(node, viewFactory) {
  NodeView.call(this, node, viewFactory);

  // This class is shared among all issue subtypes (errors, remarks)
  this.$el.addClass('issue');
};

IssueView.Prototype = function() {

  var __super__ = NodeView.prototype;

  this._updateTitle = function() {
    if (this.ref) {
      this.titleTextEl.innerHTML = this.ref.getContent();
    } else {
      this.titleTextEl.innerHTML = "";
    }
  };

  // Rendering
  // =============================
  //

  this.render = function() {
    NodeView.prototype.render.call(this);

    //Note: we decided to render the text of the reference instead of
    //the title property
    var titleViewEl = $$('div.issue-title-wrapper');
    this.titleTextEl = $$('.text.title', {
      children: [$$('span.title-annotation', {text: "meeh"})]
    });
    titleViewEl.appendChild(this.titleTextEl);
    // this.content.appendChild(titleViewEl);

    // Creator and date
    // --------

    // var creator = $$('div.creator', {
    //   text: (this.node.creator || "Anonymous") + ", " + jQuery.timeago(new Date(this.node.created_at)),
    //   contenteditable: false // Make sure this is not editable!
    // });

    // labelView.el.appendChild(creator);

    this.descriptionView = new TextView(this.node, this.viewFactory, {property: "description"});
    this.content.appendChild(this.descriptionView.render().el);

    var refs = this.node.getReferences();
    var refIds = Object.keys(refs);
    if (refIds.length > 0) {
      this.ref = refs[refIds[0]];
      this._updateTitle();
    }

    return this;
  };

  this.dispose = function() {
    NodeView.dispose.call(this);
    this.descriptionView.dispose();
  };

  this.onNodeUpdate = function(op) {
    if (op.path[1] === "description") {
      this.descriptionView.onNodeUpdate(op);
      return true;
    } else {
      return false;
    }
  };

  this.onGraphUpdate = function(op) {
    if (__super__.onGraphUpdate.call(this, op)) {
      return true;
    }
    // Hack: lazily detecting references to this issue
    // by *only* checking 'create' ops with an object having this node as target
    else if (op.type === "create" && op.val["target"] === this.node.id) {
      this.ref = this.node.document.get(op.val.id);
      this._updateTitle();
      return true;
    }
    // ... the same in inverse direction...
    else if (op.type === "delete" && op.val["target"] === this.node.id) {
      this.ref = null;
      this._updateTitle();
      return true;
    }
    else if (this.ref && op.path[0] === this.ref.id) {
      this._updateTitle();
      return true;
    } else {
      return false;
    }
  };

};


IssueView.Prototype.prototype = NodeView.prototype;
IssueView.prototype = new IssueView.Prototype();

module.exports = IssueView;
