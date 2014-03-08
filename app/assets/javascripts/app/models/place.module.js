'use strict';

var model = require('model'),
    Place = model('place');

Place.extend({

  update: function(data, options) {
    options = options || {};

    var ajaxOptions = {
      url: '/v1/place',
      type: 'POST',
      data: data,
      cache: false,
      complete: options.complete,
      success: options.success
    };

    if (data instanceof FormData) {
      $.extend(ajaxOptions, { contentType: false, processData: false });
    }

    $.ajax(ajaxOptions);
  }

});

module.exports = Place;

