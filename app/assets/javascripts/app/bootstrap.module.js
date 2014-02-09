var App     = require('app/components/app')
  , Login   = require('app/components/login')
  , User    = require('app/models/user')
  , Session = require('app/models/session')
  , page    = require('page')
  , j       = jQuery;

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
  return setTimeout(function(){
    page(to);
  }, 0); // TODO: lame
}

module.exports = function(options){
  j.extend(Session, options);
  Session.user = new User(options.user);
  Session.setCSRFToken(options.csrfToken);
  page();
};
