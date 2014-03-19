/** @jsx React.DOM */

'use strict';

var uuid  = require('uuid'),
    React = require('react'),
    Hour  = require('app/models/hour');


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


var HoursTable = React.createClass({

  handleSave: function(event) {
    var model = new Hour({ id: uuid() });

    this.props.hours.add(model);

    event.preventDefault();
  },

  /* jshint ignore:start */

  render: function() {
    var hours = this.props.hours.sortBy(function(model) {
      return model.get('weekday');
    });

    hours = hours.map(function(model) {
      return (
        <HoursRow key={model.id} instance={model} />
      );
    }, this);

    return (
      <table className="hours-table">
        <thead>
          <tr>
            <th>Dia da semana</th>
            <th>Horário de abertura</th>
            <th>Horário de fechamento</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{hours}</tbody>
        <tfoot>
          <tr>
            <td colSpan="4">
              <button className="hours-button" onClick={this.handleSave}>
                <span className="fui-plus"/>
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    );
  }

  /* jshint ignore:end */

});

module.exports = HoursTable;

