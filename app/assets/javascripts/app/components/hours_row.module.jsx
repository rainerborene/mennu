/** @jsx React.DOM */

'use strict';

var React = require('react');

var HoursRow = React.createClass({

  getInitialState: function() {
    return {
      weekday: this.props.instance.get('weekday'),
      startTime: this.props.instance.get('start_time'),
      endTime: this.props.instance.get('end_time')
    };
  },

  handleChange: function() {
    var attrs = {
      weekday: this.refs.weekday.getDOMNode().value,
      start_time: this.refs.startTime.getDOMNode().value,
      end_time: this.refs.endTime.getDOMNode().value
    };

    this.props.instance.set(attrs);
    this.props.instance.save();

    this.setState(this.getInitialState());
  },

  handleRemove: function(event) {
    this.props.instance.destroy();
    event.preventDefault();
  },

  /* jshint ignore:start */

  makeOption: function(hour) {
    return <option key={hour}>{hour}</option>
  },

  render: function() {
    var hours = require('app/helpers').hours;

    return (
      <tr>
        <td>
          <select onChange={this.handleChange} value={this.state.weekday} ref="weekday">
            <option value="1">Segunda-feira</option>
            <option value="2">Terça-feira</option>
            <option value="3">Quarta-feira</option>
            <option value="4">Quinta-feira</option>
            <option value="5">Sexta-feira</option>
            <option value="6">Sábado</option>
            <option value="0">Domingo</option>
          </select>
        </td>
        <td>
          <select onChange={this.handleChange} value={this.state.startTime} ref="startTime">
            {hours.map(this.makeOption)}
          </select>
        </td>
        <td>
          <select onChange={this.handleChange} value={this.state.endTime} ref="endTime">
            {hours.map(this.makeOption)}
          </select>
        </td>
        <td>
          <a href="#" className="fui-cross" onClick={this.handleRemove}></a>
        </td>
      </tr>
    );
  }

  /* jshint ignore:end */

});

module.exports = HoursRow;

