'use strict';

var Backbone   = require('backbone'),
    Categories = require('app/collections/categories'),
    Address    = require('app/models/address'),
    Hour       = require('app/models/hour');


var Place = Backbone.Model.extend({

  modelName: 'place',

  initialize: function() {
    this.address = new Address();
    this.hours = new Backbone.Collection([], { model: Hour });
    this.categories = new Categories();
  },

  url: function() {
    return '/v1/place';
  }

});

module.exports = Place;

