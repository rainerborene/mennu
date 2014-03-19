/** @jsx React.DOM */

/* jshint -W079 */

'use strict';

var React       = require('react'),
    LaddaButton = require('app/mixins').LaddaButton,
    BlankGif    = require('app/helpers').blankGif,
    Geocode     = require('app/models/geocode'),
    Map         = require('map');


var Addresses = React.createClass({

  mixins: [LaddaButton],

  getInitialState: function() {
    return {
      mapSrc: BlankGif,
      location: {}
    };
  },

  componentDidMount: function() {
    var coordinates = this.props.address.get('coordinates');
    if (coordinates instanceof Array) {
      this.changeLocation.apply(this, coordinates);
    }

    $(this.refs.phone.getDOMNode()).mask('(99) 9999-9999');

    this.props.address.bind('sync', this.ladda.stop.bind(this.ladda));
  },

  componentWillUnmount: function() {
    this.props.address.unbind('sync');
  },

  handleChange: function(event) {
    Geocode.locateTimeout(event.target.value.trim(), function(location) {
      this.changeLocation.apply(this, location.coordinates);
      this.setState({ location: location });
    }, this);
  },

  handleSubmit: function(event) {
    var phone = this.refs.phone.getDOMNode().value.trim();

    this.ladda.start();

    this.props.address.set('phone', phone);
    this.props.address.set(this.state.location);
    this.props.address.save();

    event.preventDefault();
  },

  handleLoad: function() {
    this.setState({ loading: false });
  },

  changeLocation: function(latitude, longitude) {
    var img = new Map();

    img
      .size(280, 280)
      .type('roadmap')
      .zoom(16)
      .at(latitude, longitude)
      .markers({ color: 'red' }, [
        { lat: latitude, lng: longitude }
      ]);

    this.setState({
      mapSrc: (img.url.slice(0, img.url.length - 1) + '&sensor=false'),
      loading: true
    });
  },

  /* jshint ignore:start */

  render: function() {
    var loading;

    if (this.state.loading) loading = <span className="spinner" />

    return (
      <form className="address-form" onSubmit={this.handleSubmit}>
        <img src={this.state.mapSrc} onLoad={this.handleLoad} ref="map"
          width="280" height="280" />

        <div className="address-group">
          <label>Endereço</label>
          <input className="address-query" ref="query" type="text"
            onChange={this.handleChange}
            defaultValue={this.props.address.toString()} required />

          {loading}
        </div>
        <div className="address-group">
          <label>Telefone</label>
          <input className="address-phone" ref="phone" type="text"
            defaultValue={this.props.address.get('phone')} required />
        </div>
        <button className="ladda-button address-submit" type="submit"
          data-style="slide-down" ref="submit">

          <span className="ladda-label">Confirmar</span>
        </button>
      </form>
    );
  }

  /* jshint ignore:end */

});

module.exports = Addresses;

