/** @jsx React.DOM */

var MenuItem = require('app/components/item')
  , Session  = require('app/models/session')
  , Item     = require('app/models/item')
  , j        = jQuery;

var Menu = React.createClass({

  componentDidMount: function(){
    var items = new Bloodhound({
      datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.name); },
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: Session.autocomplete.map(function(value){
        return { name: value };
      })
    });

    items.initialize();

    j(this.refs.itemInput.getDOMNode()).typeahead(null, {
      displayKey: 'name',
      source: items.ttAdapter()
    });
  },

  componentWillUnmount: function(){
    j(this.refs.itemInput.getDOMNode()).typeahead('destroy');
  },

  handleKeyDown: function(event){
    var value = event.target.value.trim()
      , item  = new Item();

    if (event.keyCode === 13 && value.length !== 0){
      item.attr({ category_name: this.props.categoryName, name: value });
      item.save();

      this.props.items.push(item);
      j(event.target).typeahead('close');
      j(event.target).typeahead('val', '');
      this.forceUpdate();
    }
  },

  handleBlur: function(event){
    event.target.value = '';
  },

  handleRemoved: function(model){
    var index = this.props.items.indexOf(model);
    if (index > -1) {
      this.props.items.splice(index, 1);
      this.forceUpdate();
    }
  },

  render: function(){
    return (
      <div className="row">
        <div className="menu col-md-3">
          <h6>{this.props.categoryName}</h6>
          <table width="100%">
            <tbody>
              {
                this.props.items.map(function(model){
                  return <MenuItem key={model.attr('id')} model={model}
                    onRemoved={this.handleRemoved.bind(this, model)} />
                }.bind(this))
              }
            </tbody>
          </table>

          <input
            type="text"
            ref="itemInput"
            className="form-control"
            placeholder="Escreva o nome do prato"
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown} />
        </div>
      </div>
    );
  }

});

module.exports = Menu;
