/* global Raven */

'use strict';

var RAVEN = 'https://e2f82d25fef348dc93f758ac996f1978@app.getsentry.com/20304';

var page        = require('page'),
    React       = require('react'),
    MenuPage    = require('app/components/menu_page'),
    LoginPage   = require('app/components/login_page'),
    ProfilePage = require('app/components/profile_page'),
    Session     = require('app/models/session');

function redirect(to) {
  return setTimeout(function() {
    page(to);
  }, 0); // TODO: lame
}

function title(string) {
  document.title = string + ' • Mennu';
}

function auth(ctx, next) {
  if (Session.authenticated()) {
    next();
    return;
  }
  redirect('/admin/login');
}

function login() {
  title('Login');
  React.renderComponent(new LoginPage(), document.body);
}

function index(ctx) {
  title('Cardápio');
  React.renderComponent(
    new MenuPage({
      pathname: ctx.pathname,
      place: Session.place
    }), document.body
  );
}

function profile(ctx) {
  title('Minha conta');

  React.renderComponent(
    new ProfilePage({
      pathname: ctx.pathname,
      instance: Session.place
    }), document.body
  );
}

module.exports = function(data) {
  var production = data.environment === 'production';

  Session.menu = data.menu;
  Session.environment = data.environment;
  Session.setPlace(data.place);
  Session.setBloodhound(data.autocomplete);
  Session.setCSRFToken(data.csrfToken);
  Session.setAddress(data.address);
  Session.setHours(data.hours);

  if (production) Raven.config(RAVEN).install();

  if (production && data.place) {
    Raven.setUser({ id: data.place.id, email: data.place.email });
  }

  page.base('/admin');
  page('/login', login);
  page('/profile', auth, profile);
  page('/', auth, index);
  page.start({ click: false });
};

