'use strict';

var Backbone = require('backbone'),
    Category = require('app/models/category'),
    _        = require('underscore');


var Categories = Backbone.Collection.extend({

  model: Category,

  comparator: function(category) {
    return category.get('position');
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

