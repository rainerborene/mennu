var MenuPage    = require('app/components/menu_page')
  , LoginPage   = require('app/components/login_page')
  , AccountPage = require('app/components/account_page')
  , Session     = require('app/models/session')
  , page        = require('page');

page.base('/admin');
page('/login', login);
page('/account', auth, account);
page('/', auth, index);

function auth(ctx, next) {
  if (Session.authenticated()){
    next();
    return;
  }
  redirect('/admin/login');
}

function login() {
  React.renderComponent(LoginPage(), document.body);
}

function index(ctx) {
  React.renderComponent(MenuPage({ pathname: ctx.pathname }), document.body);
}

function account(ctx){
  React.renderComponent(AccountPage({ pathname: ctx.pathname }), document.body);
}

function redirect(to) {
  return setTimeout(function(){
    page(to);
  }, 0); // TODO: lame
}

module.exports = function(options){
  jQuery.extend(Session, options);
  Session.setUser(options.user);
  Session.setBloodhound(options.autocomplete);
  Session.setCSRFToken(options.csrfToken);
  page.start({ click: false });
};
