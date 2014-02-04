/** @jsx React.DOM */

var Item = require('app/components/item');

var Menu = React.createClass({

  getInitialState: function(){
    return {
      items: ['Arroz', 'Feijão']
    };
  },

  handleChange: function(event){
    this.setState({ itemTitle: event.target.value });
  },

  handleKeyDown: function(event){
    var value = (this.state.itemTitle || '').trim()
      , valid = (value.length !== 0 && this.state.items.indexOf(value) === -1);

    if (event.keyCode === 13 && valid){
      this.state.items.push(value);
      this.setState({ itemTitle: '' });
    }
  },

  handleRemoved: function(title){
    this.state.items.splice(this.state.items.indexOf(title), 1);
    this.forceUpdate();
  },

  render: function(){
    var items = this.state.items.map(function(title){
      return <Item key={title.hashCode()} title={title} onRemoved={this.handleRemoved} />
    }, this);

    return (
      <div className="row">
        <div className="menu col-md-3">
          <h6>Tortas e Assados</h6>
          <table width="100%">
            <tbody>{items}</tbody>
          </table>

          <input 
            type="text" 
            className="form-control" 
            placeholder="Escreva o nome do prato"
            value={this.state.itemTitle}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown} />
        </div>
      </div>
    );
  }

});

module.exports = Menu;
