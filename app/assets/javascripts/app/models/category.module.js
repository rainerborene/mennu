'use strict';

var Backbone = require('backbone'),
    Item     = require('app/models/item');


var Category = Backbone.Model.extend({

  initialize: function() {
    this.items = new Backbone.Collection([], { model: Item });
  }

});

module.exports = Category;

