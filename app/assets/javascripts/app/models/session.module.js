'use strict';

var Backbone = require('backbone'),
    State    = require('app/state'),
    _        = require('underscore');


var Session = {

  authenticated: function() {
    return State.place.get('id') !== undefined;
  },

  authenticate: function(email, password) {
    $.ajax({
      type: 'POST',
      url: '/admin/login',
      dataType: 'json',
      data: { email: email, password: password },
      error: function() {
        this.trigger('unauthorized');
      }.bind(this),
      success: function(data, textStatus, jqXHR) {
        State.setPlace(data);
        this.trigger('authenticated');
      }.bind(this),
      complete: function() {
        this.trigger('completed');
      }.bind(this)
    });
  }

};

_.extend(Session, Backbone.Events);

module.exports = Session;

