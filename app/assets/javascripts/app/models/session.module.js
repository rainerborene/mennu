var User = require('app/models/user')
  , j    = jQuery;

var Session = {

  env: function(env){
    if (typeof env !== 'undefined') {
      this._env = env;
    }
    return this._env;
  },

  user: function(attrs){
    if (!this.hasOwnProperty('_user')) {
      this._user = new User();
    }
    if (typeof attrs === 'object'){
      this._user.set(attrs);
    }
    return this._user;
  },

  setCSRFToken: function(securityToken){
    j.ajaxPrefilter(function(options, _, xhr){
      xhr.setRequestHeader('X-CSRF-Token', securityToken);
    });
  },

  authenticated: function(){
    return this.user().has('id');
  },

  authenticate: function(options){
    j.ajax({
      type: 'POST',
      url: '/login',
      dataType: 'json',
      data: options.data,
      error: options.error,
      success: function(data, textStatus, jqXHR){
        this.user(data);
        options.success(this.user());
      }.bind(this)
    });
  }

};

module.exports = Session;
