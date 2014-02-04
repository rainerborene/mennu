/** @jsx React.DOM */

var moment     = require('moment')
  , Menu       = require('app/components/menu')
  , Header     = require('app/components/header')
  , DateHeader = require('app/components/date_header');

var App = React.createClass({

  handleDateChange: function(currentDate, done){
    done();
  },

  render: function(){
    return (
      <div className="app">
        <Header />

        <DateHeader initialDate={moment()} onDateChange={this.handleDateChange} />

        <main className="main">
          <div className="container">
            <Menu />
          </div>
        </main>
      </div>
    );
  }

});

module.exports = App;
