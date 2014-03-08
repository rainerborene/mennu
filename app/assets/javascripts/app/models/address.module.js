'use strict';

var model   = require('model'),
    Address = model('address');

Address.include({

  toString: function() {
    if ('street' in this.attributes && 'street_number' in this.attributes) {
      return [this.attr('street'), this.attr('street_number')].join(', ');
    }
  },

  toJSON: function() {
    var params = $.extend({}, this.attributes);
    delete params.coordinates;
    return { address_attributes: params };
  },

  save: function() {
    if (!Object.keys(this.changes).length) {
      return setTimeout(function() {
        this.trigger('update');
      }.bind(this), 250);
    }

    $.ajax({
      method: 'PUT',
      url: '/v1/place/address',
      data: { address: this.changes },
      dataType: 'json',
      success: function(attributes) {
        this.merge(this.changes).reset();
      }.bind(this),
      complete: function() {
        this.trigger('update');
      }.bind(this)
    });
  }

});

Address.persistence(model.NullStorage);

module.exports = Address;

