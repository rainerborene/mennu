var Model = require('model')
  , Hour = Model('hour');

Hour.persistence(Model.REST, '/v1/place/hours');

module.exports = Hour;
