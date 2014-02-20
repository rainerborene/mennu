/** @jsx React.DOM */

var Hours = require('app/helpers').hours;

var HoursRow = React.createClass({

  handleChange: function(){
    console.log('it works');
  },

  render: function(){
    return (
      <tr>
        <td>
          <select>
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
          <select onChange={this.handleChange}>
            {
              Hours.map(function(hour){
                return <option>{hour}</option>
              })
            }
          </select>
        </td>
        <td>
          <select onChange={this.handleChange}>
            {
              Hours.map(function(hour){
                return <option>{hour}</option>
              })
            }
          </select>
        </td>
        <td>
          <a href="#" className="fui-cross" onClick={this.props.onRemove}></a>
        </td>
      </tr>
    );
  }

});

var HoursTable = React.createClass({

  render: function(){
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
        <tbody>
          <HoursRow />
          <HoursRow />
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4"></td>
          </tr>
        </tfoot>
      </table>
    );
  }

});

module.exports = HoursTable;
