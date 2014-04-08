"use strict";

var _ = require("underscore");
var NodeView = require("../node").View;
var $$ = require("substance-application").$$;
var TextView = require("../text/text_view");
var License = require("../license").Model;


// Substance.Contributor.View
// ==========================================================================

var PublicationInfoView = function(node) {
  NodeView.call(this, node);

  this.$el.attr({id: node.id});
  this.$el.addClass("content-node publication-info");

  this.$el.on('change', "#license", _.bind(this.updateLicense, this));
  this.$el.on('change', "#published_on", _.bind(this.updatePublicationDate, this));

  // this.$el.on('mouseup', function(e) { e.stopPropagation(); });
};

PublicationInfoView.Prototype = function() {

  this.updatePublicationDate = function(e) {
    var text = this.$('#published_on');
    console.log('Published_on', text);
  };

  this.updateLicense = function(e) {
    var license = this.$('#license').val();
    this.node.setLicense(license);
  };

  // Render it
  // --------
  //

  this.render = function() {
    NodeView.prototype.render.call(this);

    // Resource Body
    // -------
    //
    // Wraps all the contents of the resource card

    var body = $$('.resource-body', {contenteditable: false});

    var formattedDates = {
      "created_at": new Date(this.node.document.created_at).toString(),
      "updated_at": new Date(this.node.document.updated_at).toString(),
      "published_on": new Date(this.node.document.published_on).toDateString()
    };

    var createdAt = $$('.created-at', {
      children: [
        $$('.label', {text: "Created at"}),
        $$('.created-at', {text: formattedDates["created_at"]})
      ]
    });

    body.appendChild(createdAt);

    this.updatedAtEl = $$('.updated-at', {text: formattedDates["updated_at"]})
    var updatedAt = $$('.updated-at', {
      children: [
        $$('.label', {text: "Modified at"}),
        this.updatedAtEl
      ]
    });

    body.appendChild(updatedAt);

    var pubDate = $$('.publication-date', {
      children: [
        $$('.label', {text: "Publication Date"}),
        $$('.pub-date', {text: formattedDates["published_on"]})
      ]
    });

    body.appendChild(pubDate);

    var license = $$('.license', {
      children: [
        $$('.label', {text: "Choose License"}),
        $$('select#license', {
          children: _.map(License.available_licenses, function(l) {
            var attrs = {value: l.code, text: l.name};
            if (this.node.getLicense() === l.code) attrs["selected"] = "selected";
            return $$('option', attrs);
          }, this)
        })
      ]
    });

    body.appendChild(license);
    this.content.appendChild(body);
    return this;
  };


  this.updateModificationDate = function() {
    var dat = new Date(this.node.document.updated_at).toString();
    this.updatedAtEl.innerHTML = dat;
  };

  this.onGraphUpdate = function(op) {
    // Call super handler and return if that has processed the operation already
    if (NodeView.prototype.onGraphUpdate.call(this, op)) {
      return true;
    }

    this.render();
    // When published date has changed, rerender
    if (_.isEqual(op.path, ["document","published_on"])) {
      this.render();
      return true;
    } else {
      this.updateModificationDate();
      return true;
    }
  };

  this.dispose = function() {
    NodeView.prototype.dispose.call(this);
  };

};

PublicationInfoView.Prototype.prototype = NodeView.prototype;
PublicationInfoView.prototype = new PublicationInfoView.Prototype();

module.exports = PublicationInfoView;
