var modella = require('modella');

var User = modella('User');

User
  .attr('id')
  .attr('name')
  .attr('slug')
  .attr('email')
  .attr('description')
  .attr('logo')
  .attr('facebook')
  .attr('foursquare')
  .attr('twitter')
  .attr('website')
  .attr('establishment_types')
  .attr('payment_method_ids')
  .attr('opened_to_public')
  .attr('expire_at')
  .attr('created_at')
  .attr('updated_at');

module.exports = User;
