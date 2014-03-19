/* global Bloodhound */

'use strict';

var Place = require('app/models/place');

var State = {

  setCSRFToken: function(securityToken) {
    $.ajaxPrefilter(function(options, _, xhr) {
      xhr.setRequestHeader('X-CSRF-Token', securityToken);
    });
  },

  setBloodhound: function(words) {
    this.Bloodhound = new Bloodhound({
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      datumTokenizer: function(d) {
        return Bloodhound.tokenizers.whitespace(d.value);
      },
      local: words.map(function(value) {
        return { value: value };
      })
    });

    this.Bloodhound.initialize();
  },

  setPlace: function(data) {
    if (typeof this.place === 'undefined') {
      this.place = new Place();
    }

    this.place.set(data.place);
    this.place.hours.reset(data.hours);
    this.place.address.set(data.address);
  }

};

module.exports = State;

