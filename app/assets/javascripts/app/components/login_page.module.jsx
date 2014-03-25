/** @jsx React.DOM */

'use strict';

var Backbone = require('backbone'),
    React    = require('react'),
    Ladda    = require('ladda'),
    Session  = require('app/models/session');


var LoginPage = React.createClass({

  componentDidMount: function() {
    this.ladda = Ladda.create(this.refs.submit.getDOMNode());

    Session.on('authenticated', this.handleAuthenticated);
    Session.on('unauthorized', this.handleUnauthorized);
    Session.on('completed', this.ladda.stop.bind(this.ladda));
  },

  componentWillMount: function() {
    document.documentElement.classList.add('login');
  },

  componentWillUnmount: function() {
    document.documentElement.classList.remove('login');
    Session.off();
  },

  handleAuthenticated: function() {
    this.setState({ success: true });
    Backbone.history.navigate('/admin', { trigger: true });
  },

  handleUnauthorized: function() {
    this.setState({ success: false });
    this.refs.password.getDOMNode().focus();
  },

  handleSubmit: function(event) {
    var email = this.refs.email.getDOMNode().value.trim(),
        password = this.refs.password.getDOMNode().value.trim();

    Session.authenticate(email, password);

    event.preventDefault();
  },

  /* jshint ignore:start */

  render: function() {
    var message = (
      <p className="message">O e-mail ou a senha inseridos estão incorretos.</p>
    );

    return (
      <form className="login-form animated fadeInDown" onSubmit={this.handleSubmit}>
        <header className="login-header">
          <h1 className="logo">Entre no Mennu</h1>
          <p>Entre e lançe o cardápio do dia.</p>
        </header>
        {this.state && this.state.success === false ? message : null}
        <div className="login-group">
          <input type="text" id="email" required autoFocus placeholder="E-mail"
            ref="email"/>

          <label className="icon fui-user" htmlFor="email"></label>
        </div>
        <div className="login-group">
          <input type="password" id="password" required placeholder="Senha"
            ref="password"/>

          <label className="icon fui-lock" htmlFor="password"></label>
        </div>
        <button type="submit" className="ladda-button" data-style="slide-down"
          ref="submit">

          <span className="ladda-label">Entrar</span>
        </button>
      </form>
    );
  }

  /* jshint ignore:end */

});

module.exports = LoginPage;

