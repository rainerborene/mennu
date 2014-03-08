var model = require('model'),
    Hour = model('hour');

Hour.persistence(model.REST, '/v1/place/hours');

module.exports = Hour;
