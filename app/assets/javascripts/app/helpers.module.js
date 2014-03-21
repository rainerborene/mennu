'use strict';

/* jslint maxlen: 115 */

var moment     = require('moment'),
    cookie     = require('cookie'),
    Backbone   = require('backbone'),
    _          = require('underscore');


cookie.defaults.expires = 1;

moment.lang('pt-br', {
  months : 'janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro'.split('_'),
  monthsShort : 'jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez'.split('_'),
  weekdays : 'domingo_segunda-feira_terça-feira_quarta-feira_quinta-feira_sexta-feira_sábado'.split('_'),
  weekdaysShort : 'dom_seg_ter_qua_qui_sex_sáb'.split('_'),
  weekdaysMin : 'dom_2ª_3ª_4ª_5ª_6ª_sáb'.split('_'),
  longDateFormat : {
    LT : 'HH:mm',
    L : 'DD/MM/YYYY',
    LL : 'D [de] MMMM [de] YYYY',
    LLL : 'D [de] MMMM [de] YYYY [às] LT',
    LLLL : 'dddd, D [de] MMMM [de] YYYY [às] LT'
  },
  calendar : {
    sameDay: '[Hoje às] LT',
    nextDay: '[Amanhã às] LT',
    nextWeek: 'dddd [às] LT',
    lastDay: '[Ontem às] LT',
    lastWeek: function () {
      return (this.day() === 0 || this.day() === 6) ?
        '[Último] dddd [às] LT' : // Saturday + Sunday
        '[Última] dddd [às] LT'; // Monday - Friday
    },
    sameElse: 'L'
  },
  relativeTime : {
    future : 'em %s',
    past : '%s atrás',
    s : 'segundos',
    m : 'um minuto',
    mm : '%d minutos',
    h : 'uma hora',
    hh : '%d horas',
    d : 'um dia',
    dd : '%d dias',
    M : 'um mês',
    MM : '%d meses',
    y : 'um ano',
    yy : '%d anos'
  },
  ordinal : '%dº'
});

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

Backbone.Model.prototype.toJSON = function(options) {
  var json = {};
  json[this.modelName] =  _.clone(this.attributes);
  return json;
};

var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

var uuid = function(len, radix) {
  var chars = CHARS, uuid = [], i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
  } else {
    // rfc4122, version 4 form
    var r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random()*16;
        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join('').toLowerCase();
};

var hours = (function() {
  var hours = [],
  i;

  for (i = 0; i <= 23; i++) {
    hours.push((1e15 + i + '').slice(-2) + ':00');
    hours.push((1e15 + i + '').slice(-2) + ':30');
  }

  return hours;
})();

var path = function(resource, params) {
  return resource.replace(/:(\w+)/g, function(_, name) {
    return params[name];
  });
};

module.exports = {
  path: path,
  uuid: uuid,
  hours: hours,
  blankGif: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
};

