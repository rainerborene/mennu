/** @jsx React.DOM */

var uuid       = require('uuid').uuid
  , moment     = require('moment')
  , Block      = require('app/components/block')
  , Header     = require('app/components/header')
  , DateHeader = require('app/components/date_header')
  , Menu       = require('app/models/menu')
  , Item       = require('app/models/item')
  , j          = jQuery;

var App = React.createClass({

  getInitialState: function(){
    return { menu: [], date: moment() };
  },

  masonryOptions: {
    isResizeBound: false,
    itemSelector: '.block, .block-template',
    columnWidth: '.block, .block-template',
    gutter: 8
  },

  antiscrollOptions: { initialDisplay: false , x: false },

  componentDidMount: function(){
    this.masonry = new Masonry(this.refs.masonry.getDOMNode(), this.masonryOptions);

    j('.antiscroll-wrap').antiscroll(this.antiscrollOptions);

    window.addEventListener('resize', this.resize);

    Menu.on('load', this.handleLoad);
    Menu.today();
  },

  componentDidUpdate: function(){
    this.resize();

    if (this.masonry){
      this.masonry.reloadItems();
      this.masonry._resetLayout();
      this.masonry.layoutItems(this.masonry.items, true);
    }
  },

  componentWillUnmount: function(){
    window.removeEventListener('resize', this.resize);
    Menu.off('load');
  },

  editable: function(){
    return this.state.date.isAfter(moment().subtract('d', 1));
  },

  resize: function(){
    var mainNode = this.refs.main.getDOMNode();

    j('.antiscroll-wrap').data('antiscroll').refresh();
    j('.antiscroll-inner').css({
      width: window.window.innerWidth,
      height: window.innerHeight - mainNode.offsetTop
    });
  },

  back: function(){
    Menu.at(this.state.date.clone().subtract('d', 1));
  },

  next: function(){
    Menu.at(this.state.date.clone().add('d', 1));
  },

  save: function(category, title){
    var item = new Item({
      name: title,
      published_at: this.state.date,
      category_name: category.name
    });

    item.save();

    category.items.push(item);

    this.forceUpdate();
  },

  destroy: function(category, model, block){
    var index = category.items.indexOf(model);
    if (index > -1) {
      model.destroy();
      category.items.splice(index, 1);
      this.forceUpdate();
    }
  },

  handleLoad: function(menu, date){
    this.setState({ menu: menu, date: date }, function(){
      this.masonry.items.forEach(function(item){
        item.reveal();
      });
    }.bind(this));
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
    var id = uuid().toLowerCase();

    this.state.menu.push({ id: id, name: 'Nova Categoria', items: [] });
    this.forceUpdate(function(){
      this.masonry.items.forEach(function(item){
        if (this.refs[id].getDOMNode() === item.element){
          item.reveal();
        }
      }, this);

      this.refs[id].changeTitle();
    }.bind(this));

    event.preventDefault();
  },

  render: function(){
    var templateBlock = null, menu = null;

    menu = this.state.menu.map(function(category){
      return <Block
        key={category.id + this.state.date}
        ref={category.id}
        instance={category}
        editable={this.editable()}
        onSave={this.save.bind(this, category)}
        onDestroy={this.destroy.bind(this, category)}
        onChangeTitle={this.handleChangeTitle} />
    }, this);

    if (this.editable()){
      templateBlock = (
        <div className="block-template">
          <a href="#" onClick={this.handleCreateBlock}>
            <span className="fui-new"></span>
            <span>Crie uma nova categoria</span>
          </a>
        </div>
      );
    }

    return (
      <div className="app">
        <Header />

        <DateHeader
          currentDate={this.state.date}
          onBack={this.back}
          onNext={this.next} />

        <div className="antiscroll-wrap main" ref="main">
          <div className="antiscroll-inner">
            <div className="container" ref="masonry">
              {menu} {templateBlock}
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = App;
