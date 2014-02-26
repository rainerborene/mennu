var j     = jQuery
  , Model = require('model')
  , Place = Model('place');

Place.extend({

  update: function(data, options){
    j.ajax({
      url: '/v1/place',
      type: 'POST',
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      complete: options.complete,
      success: options.success
    });
  }

});

module.exports = Place;
