var j       = jQuery
  , Emitter = require('emitter')
  , User    = require('app/models/user');

var Session = {

  setBloodhound: function(words){
    this.Bloodhound = new Bloodhound({
      datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.value); },
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: words.map(function(value){
        return { value: value };
      })
    });

    this.Bloodhound.initialize();
  },

  setUser: function(attrs){
    this.user = new User(attrs);
  },

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
      }.bind(this),
      complete: function(){
        this.emit('completed');
      }.bind(this)
    });
  }

};

Emitter(Session);

module.exports = Session;
