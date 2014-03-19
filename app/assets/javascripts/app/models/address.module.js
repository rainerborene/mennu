'use strict';

var Backbone = require('backbone');

var Address = Backbone.Model.extend({

  modelName: 'address',

  url: function(){
    return '/v1/place/address';
  },

  toString: function() {
    if (this.has('street') && this.has('street_number')) {
      return [
        this.get('street'),
        this.get('street_number'),
        this.get('neighborhood')
      ].join(', ');
    }
  }

});

module.exports = Address;

