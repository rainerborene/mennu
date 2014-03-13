'use strict';

var model = require('model'),
    Place = model('place');

Place.include({

  save: function(data) {
    var ajaxOptions = {
      url: '/v1/place',
      type: 'POST',
      data: data,
      cache: false,
      complete: function() {
        this.trigger('complete');
      }.bind(this),
      success: function(response) {
        this.merge(response).reset();
        this.trigger('update');
      }.bind(this)
    };

    if (data instanceof FormData) {
      $.extend(ajaxOptions, { contentType: false, processData: false });
    } else if (data.hasOwnProperty('place') === false) {
      $.extend(ajaxOptions, { data: { place: data } });
    }

    $.ajax(ajaxOptions);
  }

});

module.exports = Place;

