'use strict';

var Backbone = require('backbone'),
    uuid     = require('app/helpers').uuid;


var Hour = Backbone.Model.extend({

  modelName: 'hour',

  urlRoot: '/v1/place/hours',

  defaults: function() {
    return { id: uuid() };
  }

});

module.exports = Hour;

