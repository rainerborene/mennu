/** @jsx React.DOM */

'use strict';

var Session = require('app/models/session'),
    Ladda   = require('ladda'),
    page    = require('page');

var LoginPage = React.createClass({

  handleAuthenticated: function() {
    this.setState({ success: true });
    page('/admin');
  },

  handleUnauthorized: function() {
    this.setState({ success: false });
    this.refs.password.getDOMNode().focus();
  },

  handleCompleted: function() {
    this.ladda.stop();
  },

  handleSubmit: function(event) {
    var email = this.refs.email.getDOMNode().value.trim(),
        password = this.refs.password.getDOMNode().value.trim();

    this.ladda.start();
    Session.authenticate(email, password);
    event.preventDefault();
  },

  componentDidMount: function() {
    this.ladda = Ladda.create(this.refs.submit.getDOMNode());
  },

  componentWillMount: function() {
    Session.on('authenticated', this.handleAuthenticated);
    Session.on('unauthorized', this.handleUnauthorized);
    Session.on('completed', this.handleCompleted);
    document.documentElement.classList.add('login');
  },

  componentWillUnmount: function() {
    document.documentElement.classList.remove('login');
    Session.off();
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
          <input type="text" id="email" required autoFocus placeholder="E-mail" ref="email"/>
          <label className="icon fui-user" htmlFor="email"></label>
        </div>
        <div className="login-group">
          <input type="password" id="password" required placeholder="Senha" ref="password"/>
          <label className="icon fui-lock" htmlFor="password"></label>
        </div>
        <button type="submit" className="ladda-button" data-style="slide-down" ref="submit">
          <span className="ladda-label">Entrar</span>
        </button>
      </form>
    );
  }

  /* jshint ignore:end */

});

module.exports = LoginPage;

