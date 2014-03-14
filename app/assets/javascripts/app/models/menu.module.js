'use strict';

var moment  = require('moment'),
    Emitter = require('emitter'),
    Session = require('app/models/session'),
    Item    = require('app/models/item');

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
    params.id = Session.place.attr('id');
    path = this.path('/v1/places/:id/items/:timestamp', params);

    if (this.xhr) {
      this.xhr.abort();
    }

    this.xhr = $.getJSON(path, function(response) {
      self.parse(response);
      self.emit('load', response, moment);
    });
  },

  current: function() {
    var menu = Session.menu;
    if (menu) {
      if (this.parsed === undefined) {
        this.parse(menu);
      }

      this.emit('load', menu);
      this.parsed = true;
      return;
    }

    this.at(moment());
  }

};

Emitter(Menu);

module.exports = Menu;

