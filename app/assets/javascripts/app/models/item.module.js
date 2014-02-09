var Model = require('model')
  , Item  = Model('item');

Item.persistence(Model.REST, '/v1/items');

module.exports = Item;
