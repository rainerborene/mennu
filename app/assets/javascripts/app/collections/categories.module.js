'use strict';

var Backbone = require('backbone'),
    Category = require('app/models/category'),
    path     = require('app/helpers').path,
    _        = require('underscore');


var Categories = Backbone.Collection.extend({

  model: Category,

  comparator: function(category) {
    return category.get('position');
  },

  at: function(moment) {
    var resource = '/v1/places/:id/items/:timestamp',
        params   = {},
        self     = this;

    if (this.xhr) this.xhr.abort();

    params.id = require('app/state').place.get('id');
    params.timestamp = moment.format('X');

    this.trigger('request');
    this.xhr = $.getJSON(path(resource, params), function(response) {
      self.parse(response, { silent: true });
      self.trigger('reset', moment);
      self.trigger('sync');
    });
  },

  parse: function(response, options) {
    if (_.isNull(response)) return;

    var categories = response.map(function(model) {
      var category = new Category();
      category.set(_.omit(model, 'items'));
      category.items.reset(model.items);
      return category;
    });

    this.reset(categories, options);
  },

  save: function(ids) {
    Backbone.sync('update', this, {
      url: '/v1/categories/sorting',
      contentType: 'application/json',
      data: JSON.stringify({ category_ids: ids }),
      complete: function() {
        this.trigger('sync');
      }.bind(this)
    });
  }

});

module.exports = Categories;

