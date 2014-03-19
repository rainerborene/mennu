/** @jsx React.DOM */

/* global Masonry,NProgress */

'use strict';

var uuid       = require('uuid'),
    moment     = require('moment'),
    cookie     = require('cookie'),
    React      = require('react'),
    AntiScroll = require('app/mixins').AntiScroll,
    Menu       = require('app/models/menu'),
    Item       = require('app/models/item'),
    Header     = require('app/components/header'),
    MenuBlock  = require('app/components/menu_block'),
    MenuHeader = require('app/components/menu_header');


var MenuPage = React.createClass({

  mixins: [AntiScroll],

  getInitialState: function() {
    var last_date = moment(cookie.get('last_date'));

    return {
      menu: [],
      date: last_date.isValid() ? last_date : moment(),
      animate: true
    };
  },

  masonryOptions: {
    isResizeBound: false,
    itemSelector: '.menu-block, .menu-template',
    columnWidth: '.menu-block, .menu-template',
    gutter: 14
  },

  componentDidMount: function() {
    this.masonry = new Masonry(this.refs.masonry.getDOMNode(), this.masonryOptions);

    // Keep last publication attribute synchronized.
    this.props.place.on('request', NProgress.start);
    this.props.place.on('sync', this.forceUpdate.bind(this, null));
    this.props.place.on('sync', NProgress.done);

    Menu.on('reset', this.handleReset);
    Menu.current(this.state.date);
  },

  componentDidUpdate: function() {
    this.masonry.reloadItems();
    this.masonry._resetLayout();
    this.masonry.layoutItems(this.masonry.items, true);
  },

  componentWillUnmount: function() {
    Menu.off('reset');

    this.props.place.off('request');
    this.props.place.off('sync');
  },

  editable: function() {
    return this.state.date.isAfter(moment().subtract('d', 1));
  },

  back: function() {
    NProgress.start();
    Menu.at(this.state.date.clone().subtract('d', 1));
  },

  today: function() {
    if (!this.state.date.isSame(undefined, 'day')) {
      NProgress.start();
      Menu.at(moment());
    }
  },

  next: function() {
    NProgress.start();
    Menu.at(this.state.date.clone().add('d', 1));
  },

  save: function(category, title) {
    var item = new Item({
      name: title,
      published_at: this.state.date.format(),
      category_name: category.name
    });

    item.save();

    category.items.push(item);

    this.forceUpdate();
  },

  destroy: function(category, model, block) {
    var index = category.items.indexOf(model);
    if (index > -1) {
      model.destroy();
      category.items.splice(index, 1);
      this.forceUpdate();
    }
  },

  publish: function() {
    this.props.place.save({ last_publication: this.state.date.format() });
  },

  handleReset: function(menu, date) {
    NProgress.done();

    this.setState({ menu: menu, date: date }, function() {
      if (this.state.animate) {
        this.masonry.items.forEach(function(item) {
          item.reveal();
        });
      }

      this.state.animate = false;

      cookie.set({ last_date: this.state.date.format() });
    }.bind(this));
  },

  handleChangeTitle: function(id, title) {
    this.state.menu.forEach(function(category) {
      if (category.id === id) {
        category.name = title;
        return true;
      }
    });

    this.forceUpdate();
  },

  handleCreateBlock: function(event) {
    var id = uuid();

    this.state.menu.push({ id: id, name: 'Nova Categoria', items: [] });
    this.forceUpdate(function() {
      this.masonry.items.forEach(function(item) {
        if (this.refs[id].getDOMNode() === item.element) {
          item.reveal();
        }
      }, this);

      this.refs[id].changeTitle();
    }.bind(this));

    event.preventDefault();
  },

  /* jshint ignore: start */

  render: function() {
    var template,
        message,
        menu;

    menu = this.state.menu.map(function(category) {
      return <MenuBlock
        key={category.id + this.state.date}
        ref={category.id}
        instance={category}
        editable={this.editable()}
        onSave={this.save.bind(this, category)}
        onDestroy={this.destroy.bind(this, category)}
        onChangeTitle={this.handleChangeTitle} />
    }, this);

    if (this.editable()) {
      template = (
        <div className="menu-template">
          <a href="#" onClick={this.handleCreateBlock}>
            <span className="fui-new"></span>
            <span>Criar nova categoria</span>
          </a>
        </div>
      );
    } else if (!this.state.menu.length) {
      message = (
        <div className="chef">
          <p>Nenhum lançamento neste dia</p>
        </div>
      );
    }

    return (
      <div className="app">
        <Header />

        <MenuHeader
          currentDate={this.state.date}
          selected={this.props.place.get('last_publication')}
          onBack={this.back}
          onGotoday={this.today}
          onNext={this.next}
          onPublish={this.publish} />

        <div className="antiscroll-wrap menu" ref="wrap">
          <div className="antiscroll-inner">
            <div className="container" ref="masonry">{menu} {template} {message}</div>
          </div>
        </div>
      </div>
    );

  }

  /* jshint ignore:end */

});

module.exports = MenuPage;

