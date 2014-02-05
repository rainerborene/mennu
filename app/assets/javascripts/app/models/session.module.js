var User = require('app/models/user')
  , j    = jQuery;

var Session = {

  setCSRFToken: function(securityToken){
    j.ajaxPrefilter(function(options, _, xhr){
      xhr.setRequestHeader('X-CSRF-Token', securityToken);
    });
  },

  authenticated: function(){
    return this.user.attr('id') !== undefined;
  },

  authenticate: function(options){
    j.ajax({
      type: 'POST',
      url: '/login',
      dataType: 'json',
      data: options.data,
      error: options.error,
      success: function(data, textStatus, jqXHR){
        this.user.attr(data);
        options.success(this.user);
      }.bind(this)
    });
  }

};

module.exports = Session;
