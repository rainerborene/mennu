'use strict';

var Backbone = require('backbone'),
    Item     = require('app/models/item');


var Category = Backbone.Model.extend({

  defaults: {
    name: 'Nova Categoria'
  },

  initialize: function() {
    this.items = new Backbone.Collection([], { model: Item });
  }

});

module.exports = Category;

