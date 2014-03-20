/* global Raven */

'use strict';

var React       = require('react'),
    Backbone    = require('backbone'),
    State       = require('app/state'),
    Session     = require('app/models/session'),
    MenuPage    = require('app/components/menu_page'),
    LoginPage   = require('app/components/login_page'),
    ProfilePage = require('app/components/profile_page');


var Router = Backbone.Router.extend({

  routes: {
    'admin(/)':         'index',
    'admin/login(/)':   'login',
    'admin/profile(/)': 'profile'
  },

  index: function() {
    if (this.auth()) return;
    
    this.title('Cardápio');

    React.renderComponent(
      new MenuPage({ place: State.place }), document.body
    );
  },

  login: function() {
    if (Session.authenticated()) return this.redirect('/admin');

    this.title('Login');

    React.renderComponent(
      new LoginPage(), document.body
    );
  },

  profile: function() {
    if (this.auth()) return;

    this.title('Minha conta');

    React.renderComponent(
      new ProfilePage({ place: State.place }), document.body
    );
  },

  title: function(string) {
    document.title = string + ' • Mennu';
  },

  redirect: function(path) {
    return this.navigate(path, { trigger: true });
  },

  auth: function() {
    if (!Session.authenticated()) {
      return this.redirect('/admin/login');
    }
  }

});

module.exports = function(data) {
  var production = data.environment === 'production',
      dsn = 'https://e2f82d25fef348dc93f758ac996f1978@app.getsentry.com/20304';

  require('app/helpers');

  State.environment = data.environment;
  State.setBloodhound(data.autocomplete);
  State.setCSRFToken(data.csrfToken);
  State.setPlace(data);

  if (production) Raven.config(dsn).install();

  if (production && data.place) {
    Raven.setUser({ id: data.place.id, email: data.place.email });
  }

  new Router();

  Backbone.history.start({ pushState: true });
};

