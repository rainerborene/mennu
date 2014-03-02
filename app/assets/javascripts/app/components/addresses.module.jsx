/** @jsx React.DOM */

var Ladda    = require('ladda')
  , BlankGif = require('app/helpers').blankGif
  , Geocode  = require('app/models/geocode')
  , Map      = require('map');

var Addresses = React.createClass({

  getInitialState: function(){
    return { mapSrc: BlankGif, location: {} };
  },

  componentDidMount: function(){
    var coordinates = this.props.instance.attr('coordinates');
    if (coordinates instanceof Array) {
      this.changeLocation.apply(this, coordinates);
    }

    $(this.refs.phone.getDOMNode()).mask("(99) 9999-9999");

    this.ladda = Ladda.create(this.refs.submit.getDOMNode());
  },

  handleChange: function(event){
    Geocode.locateTimeout(event.target.value.trim(), function(location){
      this.changeLocation.apply(this, location.coordinates);
      this.setState({ location: location });
      this.ladda.stop();
    }, this);
  },

  handleSubmit: function(event){
    var phone = this.refs.phone.getDOMNode().value.trim();

    this.ladda.start();

    this.props.instance.attr('phone', phone);
    this.props.instance.attr(this.state.location);
    this.props.instance.save();

    event.preventDefault();
  },

  changeLocation: function(latitude, longitude){
    var map = new Map();

    map
      .size(280, 280)
      .type('roadmap')
      .zoom(16)
      .at(latitude, longitude)
      .markers({color: 'blue'}, [
        { lat: latitude, lng: longitude }
      ]);

    this.setState({
      mapSrc: (map.url.slice(0, map.url.length - 1) + '&sensor=false'),
    });
  },

  render: function(){
    return (
      <form className="address-form" onSubmit={this.handleSubmit}>
        <img src={this.state.mapSrc} ref="map" width="280" height="280" />
        <div className="address-group">
          <label>Endereço</label>
          <input className="address-query" ref="query" type="text"
            onChange={this.handleChange}
            defaultValue={this.props.instance.toString()}  required />
        </div>
        <div className="address-group">
          <label>Telefone</label>
          <input className="address-phone" ref="phone" type="text" 
            defaultValue={this.props.instance.attr('phone')} required />
        </div>
        <button className="ladda-button address-submit" type="submit" data-style="slide-down" ref="submit">
          <span className="ladda-label">Confirmar</span>
        </button>
      </form>
    );
  }

});

module.exports = Addresses;
