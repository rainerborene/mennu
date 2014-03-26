/* global Raven,WebFont */

/* jslint maxlen: 82 */

'use strict';

var React       = require('react'),
    Backbone    = require('backbone'),
    State       = require('app/state'),
    Session     = require('app/models/session'),
    MenuPage    = require('app/components/menu_page'),
    LoginPage   = require('app/components/login_page'),
    ProfilePage = require('app/components/profile_page'),
    _           = require('underscore');


var Router = Backbone.Router.extend({

  routes: {
    'admin(/)':         'index',
    'admin/login(/)':   'login',
    'admin/profile(/)': 'profile'
  },

  index: function() {
    if (this.before()) return;

    this.title('Cardápio');

    React.renderComponent(new MenuPage({ place: State.place }), document.body);
  },

  login: function() {
    if (Session.authenticated()) return this.redirect('/admin');

    this.title('Login');
    this.sentry();

    React.renderComponent(new LoginPage(), document.body);
  },

  profile: function() {
    if (this.before()) return;

    this.title('Minha conta');

    React.renderComponent(new ProfilePage({ place: State.place }), document.body);
  },

  title: function(string) {
    document.title = string + ' • Mennu';
  },

  redirect: function(path) {
    return this.navigate(path, { trigger: true });
  },

  before: function() {
    if (!Session.authenticated()) {
      return this.redirect('/admin/login');
    }

    this.sentry();
  },

  sentry: _.once(function() {
    var production = State.environment === 'production',
        place = State.place,
        dsn = 'https://e2f82d25fef348dc93f758ac996f1978@app.getsentry.com/20304';

    if (production) Raven.config(dsn).install();

    if (production && place.has('id')) {
      Raven.setUser({ id: place.id, email: place.email });
    }
  })

});

module.exports = function(data) {
  require('app/helpers');

  State.environment = data.environment;
  State.setBloodhound(data.autocomplete);
  State.setCSRFToken(data.csrfToken);
  State.setPlace(data);

  WebFont.load({
    google: {
      families: ['Roboto']
    },
    active: function() {
      new Router();
      Backbone.history.start({ pushState: true });
    }
  });
};

