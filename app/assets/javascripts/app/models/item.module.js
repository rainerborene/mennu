'use strict';

var Backbone = require('backbone');

var Item = Backbone.Model.extend({

  modelName: 'item',

  urlRoot: '/v1/place/items'

});

module.exports = Item;

