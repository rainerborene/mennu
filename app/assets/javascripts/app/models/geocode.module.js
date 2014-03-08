'use strict';

var Geocode = {

  timeout: 2000,

  interval: 0,

  locate: function(address, callback, context) {
    $.ajax({
      url: '/v1/geocode',
      type: 'GET',
      data: { address: address },
      success: function(response) {
        callback.call(context, response);
      }
    });
  },

  locateTimeout: function() {
    var args = arguments;
    clearInterval(this.interval);
    this.interval = setTimeout(function() {
      this.locate.apply(this, args);
    }.bind(this), this.timeout);
  }

};

module.exports = Geocode;

