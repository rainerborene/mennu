var Model = require('model')
  , Hour = Model('hour');

Hour.persistence(Model.REST, '/v1/place/hours');
Hour.include({
  format: function(name) {
    return this.attributes[name] ? 
      this.attributes[name].replace(/:\d+$/, '') : undefined;
  }
});

module.exports = Hour;
