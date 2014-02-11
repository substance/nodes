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

  this.childViews = {
    "title": null,
    "description": null
  };
};

IssueView.Prototype = function() {

  var __super__ = NodeView.prototype;

  this._updateTitle = function() {
    // var refs = this.node.getReferences();
    // this.ref = refs[Object.keys(refs)[0]];
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
    // this.childViews["title"] = new TextView(this.node, this.viewFactory, {property: "title"});
    // var titleView = this.childViews["title"];
    // this.content.appendChild(titleView.render().el);
    // var deleteButton = $$('a.delete-resource', {
    //   href: '#',
    //   text: "Delete",
    //   contenteditable: false // Make sure this is not editable!
    // });
    // titleView.el.appendChild(deleteButton);
    // titleView.el.setAttribute("contenteditable", "false");

    //Note: we decided to render the text of the reference instead of
    //the title property
    var titleViewEl = $$('div')
    this.titleTextEl = $$('.text.title')
    var deleteButton = $$('a.delete-resource', {
      href: '#',
      text: "Delete",
      contenteditable: false // Make sure this is not editable!
    });
    titleViewEl.appendChild(this.titleTextEl);
    titleViewEl.appendChild(deleteButton);
    titleViewEl.setAttribute("contenteditable", "false");
    this.content.appendChild(titleViewEl);

    // Creator and date
    // --------

    var creator = $$('div.creator', {
      text: (this.node.creator || "Anonymous") + ", " + jQuery.timeago(new Date(this.node.created_at)),
      contenteditable: false // Make sure this is not editable!
    });

    // labelView.el.appendChild(creator);

    var descriptionView = this.childViews["description"] = new TextView(this.node, this.viewFactory, {property: "description"});
    this.content.appendChild(descriptionView.render().el);

    return this;
  };

  this.onNodeUpdate = function(op) {
    if (op.path[1] === "title") {
      this.childViews["title"].onNodeUpdate(op);
      return true;
    } else if (op.path[1] === "description") {
      this.childViews["description"].onNodeUpdate(op);
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
    } else {
      return false;
    }
  };

};


IssueView.Prototype.prototype = NodeView.prototype;
IssueView.prototype = new IssueView.Prototype();

module.exports = IssueView;
