/** @jsx React.DOM */

/* global Packery,NProgress */

'use strict';

var moment       = require('moment'),
    cookie       = require('cookie'),
    React        = require('react'),
    AntiScroll   = require('app/mixins').AntiScroll,
    Item         = require('app/models/item'),
    Header       = require('app/components/header'),
    MenuBlock    = require('app/components/menu_block'),
    MenuHeader   = require('app/components/menu_header'),
    MenuMessage  = require('app/components/menu_message'),
    MenuTemplate = require('app/components/menu_template'),
    _            = require('underscore');


var MenuPage = React.createClass({

  mixins: [AntiScroll],

  draggableOptions: {
    containment: '.menu .container',
    cursor: 'move',
    handle: 'h4',
    refreshPositions: true,
    zIndex: 100
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

    this.makeDraggable();
  },

  componentWillUnmount: function() {
    this.packery.off('dragItemPositioned');
    this.props.place.off('request');
    this.props.place.off('sync');
    this.props.place.categories.off('reset');
    this.props.place.categories.off('sync');
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
    this.props.place.categories.at(this.state.date.clone().subtract('d', 1));
  },

  today: function() {
    if (!this.state.date.isSame(undefined, 'day')) {
      this.props.place.categories.at(moment());
    }
  },

  next: function() {
    this.props.place.categories.at(this.state.date.clone().add('d', 1));
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

  uuids: function() {
    var categories = [];

    this.packery.getItemElements().forEach(function(item) {
      var data = item.getAttribute('data-reactid').split(':$');
      if (data.length === 2) categories.push(data[1]);
    });

    return categories;
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
    this.setState({ date: date }, this.makeDraggable);
    cookie.set({ last_date: date.format() });
  },

  handleDragItemPositioned: function() {
    this.props.place.categories.save(this.uuids());
  },

  handleCreateBlock: function(id) {
    this.props.place.categories.add({ id: id });
    this.forceUpdate(function() {
      var block = $(this.refs[id].getDOMNode());

      block.draggable(this.draggableOptions);

      _.findWhere(this.packery.items, { element: block.get(0) }).reveal();

      this.packery.bindUIDraggableEvents(block);
      this.refs[id].changeTitle();
    });
  },

  /* jshint ignore: start */

  render: function() {
    var template,
        message,
        menu;

    menu = this.props.place.categories.map(function(category) {
      return (
        <MenuBlock
          key={category.id}
          ref={category.id}
          instance={category}
          editable={this.editable()}
          onSave={this.save.bind(this, category)}
          onDestroy={this.destroy.bind(this, category)} />
      );
    }, this);

    if (this.editable()) {
      template = (
        <MenuTemplate onClick={this.handleCreateBlock} />
      );
    } else if (this.props.place.categories.isEmpty()) {
      message = (
        <MenuMessage />
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

