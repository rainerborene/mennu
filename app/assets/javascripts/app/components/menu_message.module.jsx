/** @jsx React.DOM */

'use strict';

var React = require('react');

var MenuMessage = React.createClass({

  /* jshint ignore:start */

  render: function() {
    return (
      <div className="chef">
        <p>Nenhum lançamento neste dia</p>
      </div>
    );
  }

  /* jshint ignore:end */

});

module.exports = MenuMessage;

