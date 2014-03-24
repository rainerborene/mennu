/** @jsx React.DOM */

'use strict';

var React = require('react'),
    Hour  = require('app/models/hour'),
    HoursRow = require('app/components/hours_row');


var HoursTable = React.createClass({

  handleSave: function(event) {
    var model = new Hour();
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

