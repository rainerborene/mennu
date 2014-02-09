/** @jsx React.DOM */

var BlockItem = require('app/components/block_item')
  , Session   = require('app/models/session')
  , Item      = require('app/models/item')
  , j         = jQuery
  , Blood;

var Block = React.createClass({

  componentDidMount: function(){
    if (Blood === undefined){
      Blood = new Bloodhound({
        datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.name); },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: Session.autocomplete.map(function(value){
          return { name: value };
        })
      });

      Blood.initialize();
    }

    if (this.props.writable){
      j(this.refs.itemInput.getDOMNode()).typeahead(null, {
        displayKey: 'name',
        source: Blood.ttAdapter()
      });
    }   
  },

  componentWillUnmount: function(){
    if (this.props.writable){
      j(this.refs.itemInput.getDOMNode()).typeahead('destroy');
    }
  },

  handleTitleClick: function(){
    var title = !this.props.items.length ? prompt('Nome da categoria') : '';
    if (title) {
      this.props.onChangeTitle(this.props.key, title.trim());
      this.refs.itemInput.getDOMNode().focus();
    }
  },

  handleKeyDown: function(event){
    var value = event.target.value.trim()
      , item  = new Item();

    if (event.keyCode === 13 && value.length !== 0){
      item.attr({ category_name: this.props.name, name: value });
      item.save();

      this.props.items.push(item);
      j(event.target).typeahead('close');
      j(event.target).typeahead('val', '');
      this.forceUpdate();
    }
  },

  handleBlur: function(event){
    j(event.target).typeahead('val', '');
  },

  handleRemoved: function(model){
    var index = this.props.items.indexOf(model);
    if (index > -1) {
      this.props.items.splice(index, 1);
      this.forceUpdate();
    }
  },

  render: function(){
    var itemInput = null;

    if (this.props.writable){
      itemInput = <input
        type="text"
        ref="itemInput"
        className="form-control"
        placeholder="Escreva o nome do prato"
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown} />
    }

    return (
      <div className="block col-md-3">
        <h6 onClick={this.handleTitleClick}>{this.props.name}</h6>
        <table width="100%">
          <tbody>
            {
              this.props.items.map(function(model){
                return <BlockItem 
                  key={model.uid} 
                  model={model}
                  deletable={this.props.writable}
                  onRemoved={this.handleRemoved.bind(this, model)} />;
              }.bind(this))
            }
          </tbody>
        </table>

        {itemInput}
      </div>
    );
  }

});

module.exports = Block;
