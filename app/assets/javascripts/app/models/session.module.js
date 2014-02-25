var j       = jQuery
  , Emitter = require('emitter')
  , Place   = require('app/models/place');

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

  setPlace: function(attrs){
    this.place = new Place(attrs);
  },

  setCSRFToken: function(securityToken){
    j.ajaxPrefilter(function(options, _, xhr){
      xhr.setRequestHeader('X-CSRF-Token', securityToken);
    });
  },

  authenticated: function(){
    return this.place.attr('id') !== undefined;
  },

  authenticate: function(email, password){
    j.ajax({
      type: 'POST',
      url: '/admin/login',
      dataType: 'json',
      data: { email: email, password: password },
      error: function(){
        this.emit('unauthorized');
      }.bind(this),
      success: function(data, textStatus, jqXHR){
        this.place.attr(data);
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
