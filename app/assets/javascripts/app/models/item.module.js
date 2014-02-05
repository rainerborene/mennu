var Session = require('app/models/session')
  , Model   = require('model')
  , Item    = Model('item');

Item.persistence(Model.REST, '/v1/items');

Item.today = function(){
  var menu = Session.menu;

  Object.keys(menu).forEach(function(name){
    menu[name] = menu[name].map(function(attrs){
      attrs.category_name = name;
      return new Item(attrs);
    });
  });

  return menu;
};

module.exports = Item;
