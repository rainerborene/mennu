/** @jsx React.DOM */

var uuid       = require('uuid').uuid
  , moment     = require('moment')
  , Block      = require('app/components/block')
  , Header     = require('app/components/header')
  , DateHeader = require('app/components/date_header')
  , Menu       = require('app/models/menu');

var App = React.createClass({

  getInitialState: function(){
    return { menu: [], date: moment() };
  },

  componentDidMount: function(){
    Menu.on('load', this.handleLoad);
    Menu.today();
  },

  componentWillUnmount: function(){
    Menu.off('load');
  },

  isLate: function(){
    return this.state.date.isAfter(moment().subtract('d', 1));
  },

  handleLoad: function(menu, date){
    this.setState({ menu: menu, date: date });
  },

  handleChangeTitle: function(id, title){
    this.state.menu.forEach(function(category){
      if (category.id === id){
        category.name = title;
        return true;
      }   
    });

    this.forceUpdate();
  },

  handleCreateBlock: function(event){
    event.preventDefault();

    this.state.menu.push({
      id: uuid().toLowerCase(),
      name: 'Nova Categoria',
      items: []
    });

    this.forceUpdate();
  },

  handleDateBack: function(){
    Menu.at(this.state.date.clone().subtract('d', 1));
  },

  handleDateNext: function(){
    Menu.at(this.state.date.clone().add('d', 1));
  },

  render: function(){
    var templateBlock = null, menu = null;

    menu = this.state.menu.map(function(category){
      return <Block
        key={category.id}
        name={category.name}
        items={category.items}
        writable={this.isLate()}
        onChangeTitle={this.handleChangeTitle} />
    }, this);

    if (this.isLate()){
      templateBlock = (
        <div className="block-template col-md-3">
          <a href="#" onClick={this.handleCreateBlock}>
            <span className="fui-new"></span> Crie uma nova categoria
          </a>
        </div>
      );
    }

    return (
      <div className="app">
        <Header />

        <DateHeader
          currentDate={this.state.date}
          onBack={this.handleDateBack}
          onNext={this.handleDateNext} />

        <main className="main">
          <div className="container">
            <div className="row">
              {menu}
              {templateBlock}
            </div>
          </div>
        </main>
      </div>
    );
  }

});

module.exports = App;
