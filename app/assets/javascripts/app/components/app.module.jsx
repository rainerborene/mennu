/** @jsx React.DOM */

var moment     = require('moment')
  , Menu       = require('app/components/menu')
  , Header     = require('app/components/header')
  , DateHeader = require('app/components/date_header')
  , Item       = require('app/models/item');

var App = React.createClass({

  handleDateChange: function(currentDate, done){
    done();
  },

  render: function(){
    var menu = Item.today();

    return (
      <div className="app">
        <Header />

        <DateHeader initialDate={moment()} onDateChange={this.handleDateChange} />

        <main className="main">
          <div className="container">
            {
              Object.keys(menu).map(function(name){
                return <Menu key={name} categoryName={name} items={menu[name]} />
              })
            }
          </div>
        </main>
      </div>
    );
  }

});

module.exports = App;
