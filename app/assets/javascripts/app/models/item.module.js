var model = require('model'),
    Item  = model('item');

Item.persistence(model.REST, '/v1/place/items');

module.exports = Item;
