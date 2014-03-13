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

  handlePublishClick: function() {
    this.props.onPublish();
  },

  isSelected: function() {
    return this.props.selected === undefined ? false :
           this.props.currentDate.isSame(this.props.selected, 'day');
  },

  isAfter: function() {
    return this.props.currentDate.isSame(undefined, 'day') ||
           this.props.currentDate.isAfter();
  },

  /* jshint ignore:start */

  render: function() {
    var publishClass = 'publish-button ',
        publishButton;

    publishClass += this.isSelected() ? 'fui-checkbox-checked' : 'fui-checkbox-unchecked';

    if (this.isAfter()) {
      publishButton = (
        <a href="#" className={publishClass} title="Publicar cardápio"
          onClick={this.handlePublishClick} />
      )
    }

    return (
      <header className="menu-header">
        <div className="container">
          <h2>
            {this.props.currentDate.format('dddd')}
            <small>{this.props.currentDate.format('D [de] MMMM')}</small>
          </h2>

          <div className="actions">
            {publishButton}

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
        </div>
      </header>
    );
  }

  /* jshint ignore:end */

});

module.exports = MenuHeader;

