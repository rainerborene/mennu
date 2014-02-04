var App     = require('app/components/app')
  , Login   = require('app/components/login')
  , User    = require('app/models/user')
  , Session = require('app/models/session')
  , page    = require('page');

page.base('/admin');
page('/login', login);
page('/', auth, index);

function auth(ctx, next) {
  if (Session.authenticated()){
    next();
    return;
  }
  redirect('/admin/login');
}

function index() {
  React.renderComponent(App(), document.body);
}

function login() {
  React.renderComponent(Login(), document.body);
}

function redirect(to) {
  console.log('redirecting to %s', to);
  return setTimeout(function(){
    page(to);
  }, 0); // TODO: lame
}

module.exports = function(options){
  Session.user(options.user);
  Session.env(options.environment);
  Session.setCSRFToken(options.csrfToken);
  page();
};
