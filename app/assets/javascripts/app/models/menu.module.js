var j       = jQuery
  , moment  = require('moment')
  , Emitter = require('emitter')
  , Session = require('app/models/session')
  , Item    = require('app/models/item')
  , Menu;

Menu = {

  path: function(string, params){
    return string.replace(/:(\w+)/g, function(_, name){
      return params[name];
    });
  },

  parse: function(response){
    response.map(function(menu){
      menu.items = menu.items.map(function(attrs){
        attrs.category_name = name;
        return new Item(attrs);
      });

      return menu;
    });
  },

  at: function(moment){
    var params = {}
      , self = this
      , path;

    params.timestamp = moment.format('X');
    params.id = Session.user.attr('id');
    path = this.path('/v1/places/:id/items/:timestamp', params);

    if (this.xhr){
      this.xhr.abort();
    }

    this.xhr = j.getJSON(path, function(response){
      self.parse(response);
      self.emit('load', response, moment);
    });
  },

  today: function(){
    var menu = Session.menu;
    if (menu){
      if (this.parsed === undefined) {
        this.parse(menu);
      }

      this.emit('load', menu, moment());
      this.parsed = true;
      return;
    }

    this.at(moment());
  }

};

Emitter(Menu);

module.exports = Menu;
