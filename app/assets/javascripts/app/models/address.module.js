var Model   = require('model')
  , Address = Model('address');

Address.include({

  toString: function(){
    if ('street' in this.attributes && 'street_number' in this.attributes) {
      return [this.attr('street'), this.attr('street_number')].join(', ');
    }   
  },

  toJSON: function(){
    var params = $.extend({}, this.attributes);
    delete params.coordinates;
    return { address_attributes: params };
  }

});

Address.persistence(Model.NullStorage);

module.exports = Address;
