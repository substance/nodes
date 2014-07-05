"use strict";

var _ = require("underscore");
var NodeView = require("../node").View;
var $$ = require("substance-application").$$;
var License = require("../license").Model;


// Substance.Contributor.View
// ==========================================================================

var PublicationInfoView = function(node) {
  NodeView.call(this, node);

  this.$el.attr({id: node.id});
  this.$el.addClass("content-node publication-info");

  this.$el.on('change', "#license", _.bind(this.updateLicense, this));
  this.$el.on('change', "#published_on", _.bind(this.updatePublicationDate, this));
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
      "created_at": new Date(this.node.document.created_at).toDateString(),
      "updated_at": jQuery.timeago(new Date(this.node.document.updated_at)),
      "published_on": new Date(this.node.document.published_on).toDateString()
    };

    var keywordsEl = $$('.keywords', {
      children: [
        $$('.label', {text: "Keywords"}),
        $$('.keywords', {html: "Arctic, Greenpeace, Mannes Ubels"})
      ]
    });

    body.appendChild(keywordsEl);

    var creditsEl = $$('.credits', {
      children: [
        $$('.label', {text: "Credits"}),
        $$('.credits', {html: "Interview by Daniel Beilinson Cover photo by John Foo"})
      ]
    });

    body.appendChild(creditsEl);


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


    var dates = $$('.dates', {
      html: [
        'This article was created on <b>',
        formattedDates["created_at"],
        '</b> and published on <b>',
        formattedDates["published_on"],
        '</b>. Last update was made ',
        '<span class="updated-at"><b>'+formattedDates["updated_at"]+'</b></span>.'
      ].join('')
    });

    body.appendChild(dates);

    this.content.appendChild(body);
    return this;
  };

  this.updateModificationDate = function() {
    var dat = jQuery.timeago(new Date(this.node.document.updated_at));
    this.$('.updated-at').html(dat);
  };

  this.onGraphUpdate = function(op) {
    // Call super handler and return if that has processed the operation already
    if (NodeView.prototype.onGraphUpdate.call(this, op)) {
      return true;
    }
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
