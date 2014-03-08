'use strict';

var hours = (function() {
  var hours = [],
      i;

  for (i = 0; i <= 23; i++) {
    hours.push((1e15 + i + '').slice(-2) + ':00');
    hours.push((1e15 + i + '').slice(-2) + ':30');
  }

  return hours;
})();

module.exports = {
  hours: hours,
  blankGif: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///' +
            'wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
};

