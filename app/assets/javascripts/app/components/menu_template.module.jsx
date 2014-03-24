/** @jsx React.DOM */

'use strict';

var uuid  = require('app/helpers').uuid,
    React = require('react');


var MenuTemplate = React.createClass({

  handleClick: function(event) {
    this.props.onClick(uuid());
    event.preventDefault();
  },

  /* jshint ignore:start */

  render: function() {
    return (
      <div className="menu-template">
        <a href="#" onClick={this.handleClick}>
          <span className="fui-new"></span>
          <span>Criar nova categoria</span>
        </a>
      </div>
    );
  }

  /* jshint ignore:end */

});

module.exports = MenuTemplate;

