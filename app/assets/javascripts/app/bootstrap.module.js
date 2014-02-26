var page        = require('page')
  , MenuPage    = require('app/components/menu_page')
  , LoginPage   = require('app/components/login_page')
  , ProfilePage = require('app/components/profile_page')
  , Session     = require('app/models/session')
  , Hour        = require('app/models/hour');

page.base('/admin');
page('/login', login);
page('/profile', auth, profile);
page('/', auth, index);

function auth(ctx, next) {
  if (Session.authenticated()){
    next();
    return;
  }
  redirect('/admin/login');
}

function login() {
  title('Login');
  React.renderComponent(LoginPage(), document.body);
}

function index(ctx) {
  title('Cardápio');
  React.renderComponent(MenuPage({ pathname: ctx.pathname }), document.body);
}

function profile(ctx){
  title('Minha conta');
  React.renderComponent(ProfilePage({ pathname: ctx.pathname }), document.body);
}

function redirect(to) {
  return setTimeout(function(){
    page(to);
  }, 0); // TODO: lame
}

function title(string) {
  document.title = string + ' • Mennu';
}

module.exports = function(options){
  jQuery.extend(Session, options);
  Session.setPlace(options.place);
  Session.setBloodhound(options.autocomplete);
  Session.setCSRFToken(options.csrfToken);

  options.hours.forEach(function(attr){
    Hour.add(new Hour(attr));
  });

  page.start({ click: false });
};
