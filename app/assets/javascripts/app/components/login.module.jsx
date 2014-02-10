/** @jsx React.DOM */

var page    = require('page')
  , Session = require('app/models/session');

var Login = React.createClass({

  handleAuthenticated: function(){
    this.setState({ success: true });
    page('/admin');
  },

  handleUnauthorized: function(){
    this.setState({ success: false });
    this.refs.password.getDOMNode().focus();
  },

  handleSubmit: function(event){
    var email = this.refs.email.getDOMNode().value.trim()
      , password = this.refs.password.getDOMNode().value.trim();

    Session.authenticate(email, password);

    event.preventDefault();
  },

  componentWillMount: function(){
    Session.on('authenticated', this.handleAuthenticated);
    Session.on('unauthorized', this.handleUnauthorized);
    document.documentElement.classList.add('login');
  },

  componentWillUnmount: function(){
    document.documentElement.classList.remove('login');
    Session.off();
  },

  render: function(){
    var classes = 'form-group' + (this.state === null || this.state.success ? '' : ' has-error');

    return (
      <form className="form animated fadeInDown" role="form" onSubmit={this.handleSubmit}>
        <h3 className="heading">Menu</h3>
        <div className={classes}>
          <div className="form-group">
            <input type="text" className="form-control" id="email" required autoFocus placeholder="Email" ref="email"/>
            <label className="icon fui-user" htmlFor="email"></label>
          </div>
          <div className="form-group">
            <input type="password" className="form-control" id="password" required placeholder="Senha" ref="password"/>
            <label className="icon fui-lock" htmlFor="password"></label>
          </div>
        </div>
        <button className="btn btn-lg btn-primary btn-embossed btn-block" type="submit">Entrar</button>
      </form>
    );
  }

});

module.exports = Login;
