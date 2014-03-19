'use strict';

var Backbone = require('backbone'),
    Address  = require('app/models/address'),
    Hour     = require('app/models/hour');


var Place = Backbone.Model.extend({

  modelName: 'place',

  initialize: function() {
    this.hours = new Backbone.Collection([], { model: Hour });
    this.address = new Address();
  },

  url: function() {
    return '/v1/place';
  }

});

module.exports = Place;

