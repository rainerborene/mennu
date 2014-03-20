'use strict';

var moment   = require('moment'),
    Backbone = require('backbone'),
    State    = require('app/state'),
    _        = require('underscore');


var Menu = {

  path: function(params) {
    var path = '/v1/places/:id/items/:timestamp';
    return path.replace(/:(\w+)/g, function(_, name) {
      return params[name];
    });
  },

  at: function(moment) {
    var params = {};

    if (this.xhr) this.xhr.abort();

    params.timestamp = moment.format('X');
    params.id = State.place.get('id');

    this.trigger('request');

    this.xhr = $.getJSON(this.path(params), function(response) {
      State.place.categories.parse(response, { silent: true });
      State.place.categories.trigger('reset', moment);
      State.place.categories.trigger('sync');
    }.bind(this));
  }

};

_.extend(Menu, Backbone.Events);

module.exports = Menu;

