'use strict';

var moment   = require('moment'),
    Backbone = require('backbone'),
    State    = require('app/state'),
    Item     = require('app/models/item'),
    _        = require('underscore');


var Menu = {

  path: function(string, params) {
    return string.replace(/:(\w+)/g, function(_, name) {
      return params[name];
    });
  },

  parse: function(response) {
    response.map(function(menu) {
      menu.items = menu.items.map(function(attrs) {
        attrs.category_name = name;
        return new Item(attrs);
      });

      return menu;
    });
  },

  at: function(moment) {
    var self   = this,
        params = {},
        path;

    params.timestamp = moment.format('X');
    params.id = State.place.get('id');
    path = this.path('/v1/places/:id/items/:timestamp', params);

    if (this.xhr) {
      this.xhr.abort();
    }

    this.xhr = $.getJSON(path, function(response) {
      self.parse(response);
      self.trigger('reset', response, moment);
    });
  },

  current: function(date) {
    var menu = State.menu;

    if (_.isUndefined(this.initialDate)) this.initialDate = date;

    if (menu) {
      if (this.parsed === undefined) {
        this.parse(menu);
      }

      this.trigger('reset', menu, this.initialDate);
      this.parsed = true;
      return;
    }

    this.at(moment());
  }

};

_.extend(Menu, Backbone.Events);

module.exports = Menu;

