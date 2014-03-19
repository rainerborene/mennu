/** @jsx React.DOM */

'use strict';

var Backbone = require('backbone'),
    React    = require('react');


var Header = React.createClass({

  navigate: function(event) {
    Backbone.history.navigate(event.target.getAttribute('href'), {
      trigger: true
    });

    event.preventDefault();
  },

  current: function(pathname) {
    return location.pathname === pathname ? 'active' : '';
  },

  /* jshint ignore:start */

  render: function() {
    return (
      <header className="header">
        <div className="container">
          <h1 className="logo">Mennu</h1>

          <ul className="nav">
            <li>
              <a onClick={this.navigate} href="/admin"
                className={this.current('/admin')}>Cardápio</a>
            </li>
            <li>
              <a onClick={this.navigate} href="/admin/profile"
                className={this.current('/admin/profile')}>Minha conta</a>
            </li>
            <li>
              <a href="/admin/logout">Sair</a>
            </li>
          </ul>
        </div>
      </header>
    );
  }

  /* jshint ignore:end */

});

module.exports = Header;

