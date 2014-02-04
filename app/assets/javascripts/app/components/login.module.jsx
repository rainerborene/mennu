/** @jsx React.DOM */

var page    = require('page')
  , Session = require('app/models/session');

var Login = React.createClass({

  handleError: function(){
    this.setState({ success: false });
    this.refs.email.getDOMNode().focus();
  },

  handleSuccess: function(user){
    this.setState({ success: true });
    page('/admin');
  },

  handleSubmit: function(event){
    var email = this.refs.email.getDOMNode().value.trim()
      , password = this.refs.password.getDOMNode().value.trim();

    Session.authenticate({
      data: { email: email, password: password },
      success: this.handleSuccess,
      error: this.handleError
    });

    event.preventDefault();
  },

  componentWillMount: function(){
    document.documentElement.classList.add('login');
  },

  componentWillUnmount: function(){
    document.documentElement.classList.remove('login');
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
