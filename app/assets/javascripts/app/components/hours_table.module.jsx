/** @jsx React.DOM */

var uuid  = require('uuid')
  , Hour  = require('app/models/hour')
  , Hours = require('app/helpers').hours;

var HoursRow = React.createClass({

  getInitialState: function(){
    return {
      weekday: this.props.instance.attr('weekday'),
      startTime: this.props.instance.format('start_time'),
      endTime: this.props.instance.format('end_time')
    };
  },

  handleChange: function(){
    var attrs = {
      weekday: this.refs.weekday.getDOMNode().value,
      start_time: this.refs.startTime.getDOMNode().value,
      end_time: this.refs.endTime.getDOMNode().value
    };

    this.props.instance.attr(attrs);
    this.props.instance.save();

    this.setState({
      weekday: attrs.weekday,
      startTime: attrs.start_time,
      endTime: attrs.end_time
    });
  },

  handleRemove: function(event){
    this.props.instance.destroy();
    Hour.remove(this.props.instance);
    event.preventDefault();
  },

  makeOption: function(hour){
    return <option key={hour}>{hour}</option>
  },

  render: function(){
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
            {Hours.map(this.makeOption)}
          </select>
        </td>
        <td>
          <select onChange={this.handleChange} defaultValue={this.state.endTime} ref="endTime">
            {Hours.map(this.makeOption)}
          </select>
        </td>
        <td>
          <a href="#" className="fui-cross" onClick={this.handleRemove}></a>
        </td>
      </tr>
    );
  }

});

var HoursTable = React.createClass({

  getDefaultProps: function(){
    return { hours: [] };
  },

  handleSave: function(event){
    Hour.add(new Hour({ id: uuid() }));
    event.preventDefault();
  },

  render: function(){
    var hours = this.props.hours.map(function(instance){
      return <HoursRow key={instance.id()} instance={instance}
        onDestroy={this.props.onDestroy}
        onChange={this.props.onChange}
      />
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

});

module.exports = HoursTable;
