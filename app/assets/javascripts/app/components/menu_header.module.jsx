/** @jsx React.DOM */

'use strict';

var React = require('react');

var MenuHeader = React.createClass({

  handleBack: function(event) {
    event.preventDefault();
    this.props.onBack();
  },

  handleToday: function(event) {
    event.preventDefault();
    this.props.onGotoday();
  },

  handleNext: function(event) {
    event.preventDefault();
    this.props.onNext();
  },

  /* jshint ignore:start */

  render: function() {
    return (
      <header className="menu-header">
        <div className="container">
          <h2>
            {this.props.currentDate.format('dddd')}
            <small>{this.props.currentDate.format('D [de] MMMM')}</small>
          </h2>

          <ul className="pagination">
            <li title="Anterior">
              <a href="#" className="fui-arrow-left" onClick={this.handleBack} />
            </li>
            <li title="Ir para hoje">
              <a href="#" className="today" onClick={this.handleToday}>Hoje</a>
            </li>
            <li title="Próximo">
              <a href="#" className="fui-arrow-right" onClick={this.handleNext} />
            </li>
          </ul>
        </div>
      </header>
    );
  }

  /* jshint ignore:end */

});

module.exports = MenuHeader;

