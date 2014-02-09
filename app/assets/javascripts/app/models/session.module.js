var Emitter = require('emitter')
  , User    = require('app/models/user')
  , j       = jQuery;

var Session = {

  setCSRFToken: function(securityToken){
    j.ajaxPrefilter(function(options, _, xhr){
      xhr.setRequestHeader('X-CSRF-Token', securityToken);
    });
  },

  authenticated: function(){
    return this.user.attr('id') !== undefined;
  },

  authenticate: function(email, password){
    j.ajax({
      type: 'POST',
      url: '/login',
      dataType: 'json',
      data: { email: email, password: password },
      error: function(){
        this.emit('unauthorized');
      }.bind(this),
      success: function(data, textStatus, jqXHR){
        this.user.attr(data);
        this.emit('authenticated');
      }.bind(this)
    });
  }

};

Emitter(Session);;

module.exports = Session;
