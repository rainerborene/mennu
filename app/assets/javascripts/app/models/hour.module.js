'use strict';

var Backbone = require('backbone');

var Hour = Backbone.Model.extend({

  modelName: 'hour',

  urlRoot: '/v1/place/hours'

});

module.exports = Hour;

