'use strict';

var Ladda  = require('ladda');

var AntiScroll = {

  antiscrollOptions: { initialDisplay: false, x: false },

  componentDidMount: function() {
    $('.antiscroll-wrap').antiscroll(this.antiscrollOptions);
    window.addEventListener('resize', this.resize);
    this.resize();
  },

  componentDidUpdate: function() {
    this.resize();
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.resize);
  },

  resize: function(event) {
    $('.antiscroll-inner').css({
      width: window.window.innerWidth,
      height: window.innerHeight - this.refs.wrap.getDOMNode().offsetTop
    });

    $('.antiscroll-wrap').data('antiscroll').refresh();
  }

};

var LaddaButton = {

  componentDidMount: function() {
    Ladda.bind('input[type=submit]');
    Ladda.bind('button[type=submit]');
  },

  stopLadda: function() {
    setTimeout(Ladda.stopAll.bind(Ladda), 250);
  }

};

module.exports = { LaddaButton: LaddaButton, AntiScroll: AntiScroll };

