var Model = require('model')
  , Item  = Model('item');

Item.persistence(Model.REST, '/v1/place/items');

module.exports = Item;
