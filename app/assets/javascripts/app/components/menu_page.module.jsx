/** @jsx React.DOM */

/* global Packery,NProgress */

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

  draggableOptions: {
    containment: '.menu .container',
    handle: 'h4',
    cursor: 'move',
    zIndex: 100,
    refreshPositions: true
  },

  options: {
    isResizeBound: false,
    itemSelector: '.menu-block, .menu-template',
    columnWidth: '.menu-block',
    gutter: 14
  },

  getInitialState: function() {
    var lastDate = moment(cookie.get('last_date'));

    return { date: lastDate.isValid() ? lastDate : moment() };
  },

  componentDidMount: function() {
    this.packery = new Packery(this.refs.packery.getDOMNode(), this.options);
    this.packery.on('dragItemPositioned', this.handleDragItemPositioned);
    this.packery.items.forEach(function(item) {
      item.reveal();
    });

    // Keep last publication attribute synchronized.
    this.props.place.on('request', NProgress.start);
    this.props.place.on('sync', NProgress.done);
    this.props.place.on('sync', this.forceUpdate.bind(this, null));
    this.props.place.categories.on('request', NProgress.start);
    this.props.place.categories.on('reset', this.handleReset);
    this.props.place.categories.on('sync', NProgress.done);

    Menu.on('request', NProgress.start);

    this.makeDraggable();
  },

  componentWillUnmount: function() {
    this.packery.off('dragItemPositioned');

    this.props.place.off('request');
    this.props.place.off('sync');
    this.props.place.categories.off('reset');
    this.props.place.categories.off('sync');

    Menu.off('request');
  },

  componentDidUpdate: function() {
    this.packery.reloadItems();
    this.packery._resetLayout();
    this.packery.layoutItems(this.packery.items, true);
  },

  editable: function() {
    return moment().diff(this.state.date.startOf('day'), 'hours') <= 24;
  },

  back: function() {
    Menu.at(this.state.date.clone().subtract('d', 1));
  },

  today: function() {
    if (!this.state.date.isSame(undefined, 'day')) {
      Menu.at(moment());
    }
  },

  next: function() {
    Menu.at(this.state.date.clone().add('d', 1));
  },

  save: function(category, title) {
    category.items.create({
      name: title,
      published_at: this.state.date.format(),
      category_name: category.get('name')
    });

    this.forceUpdate();
  },

  destroy: function(category, model, block) {
    model.destroy();
    this.forceUpdate();
  },

  publish: function() {
    this.props.place.save({ last_publication: this.state.date.format() });
  },

  makeDraggable: function() {
    var itemElems = $(this.packery.getItemElements()).not('.menu-template');

    itemElems.off('drag');
    itemElems.off('dragstop');
    itemElems.off('dragstart');
    itemElems.each(function(idx, item) {
      var elem = $(item);
      if (elem.data('ui-draggable')) {
        elem.draggable('disable');
      }
    });

    if (this.editable()) {
      itemElems.draggable(this.draggableOptions);
      itemElems.draggable('enable');
      this.packery.bindUIDraggableEvents(itemElems);
    }
  },

  handleReset: function(date) {
    this.setState({ date: date }, function() {
      cookie.set({ last_date: this.state.date.format() });
      this.makeDraggable();
    }.bind(this));
  },

  handleDragItemPositioned: function(pckryInstance, draggedItem) {
    var itemElems = this.packery.getItemElements(), ids = [];

    itemElems.forEach(function(item) {
      if (item.classList.contains('menu-block')) {
        ids.push(item.getAttribute('data-reactid').split(':$')[1]);
      }
    });

    this.props.place.categories.save(ids);
  },

  handleCreateBlock: function(event) {
    var id = uuid();

    this.props.place.categories.add({ id: id, name: 'Nova Categoria' });
    this.forceUpdate(function() {
      var block = $(this.refs[id].getDOMNode());

      this.packery.items.forEach(function(item) {
        if (block.get(0) === item.element) item.reveal();
      }, this);

      block.draggable(this.draggableOptions);

      this.packery.bindUIDraggableEvents(block);
      this.refs[id].changeTitle();
    }.bind(this));

    event.preventDefault();
  },

  /* jshint ignore: start */

  render: function() {
    var template,
        message,
        menu;

    menu = this.props.place.categories.map(function(category) {
      return <MenuBlock
        key={category.id}
        ref={category.id}
        instance={category}
        editable={this.editable()}
        onSave={this.save.bind(this, category)}
        onDestroy={this.destroy.bind(this, category)} />
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
    } else if (!this.props.place.categories.length) {
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
            <div className="container" ref="packery">{menu}{template}{message}</div>
          </div>
        </div>
      </div>
    );
  }

  /* jshint ignore:end */

});

module.exports = MenuPage;

