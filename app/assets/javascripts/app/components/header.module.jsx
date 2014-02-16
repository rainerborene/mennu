/** @jsx React.DOM */

var page = require('page');

var Header = React.createClass({

  navigate: function(event){
    var href = event.target.getAttribute('href');
    if ( ! href.match('logout') ) {
      page(href);
      event.preventDefault();
    }
  },

  render: function(){
    var accountClass = this.props.pathname === '/admin/account' ? 'active' : ''
      , adminClass   = this.props.pathname === '/admin'         ? 'active' : '';

    return (
      <header className="header">
        <div className="container">
          <h1 className="logo">Mennu</h1>

          <ul className="nav">
            <li><a onClick={this.navigate} href="/admin" className={adminClass}>Cardápio</a></li>
            <li><a onClick={this.navigate} href="/admin/account" className={accountClass}>Sua conta</a></li>
            <li><a onClick={this.navigate} href="/admin/logout">Sair</a></li>
          </ul>
        </div>
      </header>
    );
  }

});

module.exports = Header;
