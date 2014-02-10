/** @jsx React.DOM */

var j       = jQuery
  , Session = require('app/models/session')
  , Blood;

var Block = React.createClass({

  componentDidMount: function(){
    var textarea = this.refs.itemTextarea.getDOMNode();

    if (Blood === undefined){
      Blood = new Bloodhound({
        datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.value); },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: Session.autocomplete.map(function(value){
          return { value: value };
        })
      });

      Blood.initialize();
    }

    if (this.props.editable){
      j(textarea).autosize();
      j(textarea).typeahead(null, { source: Blood.ttAdapter() });
      j(textarea).bind('typeahead:selected', this.handleSelected);
    }
  },

  componentWillUnmount: function(){
    var textarea = this.refs.itemTextarea.getDOMNode();

    if (this.props.editable){
      j(textarea).typeahead('destroy');
      j(textarea).trigger('autosize.destroy');
    }
  },

  handleSelected: function(event){
    j(event.target).trigger('autosize.resize');
  },

  handleKeyDown: function(event){
    var value = event.target.value.trim(), item;

    if (event.keyCode === 13 && value.length !== 0){
      this.props.onSave(value);
      this.closeTypeahead();
    }
  },

  handleRemoved: function(model){
    this.props.onDestroy(model, this);
  },

  closeTypeahead: function(){
    var node = this.refs.itemTextarea.getDOMNode();
    j(node).typeahead('close');
    j(node).typeahead('val', '');
    j(node).val('');
  },

  changeTitle: function(){
    var name = this.props.instance.name
      , value = name !== 'Nova Categoria' ? name : ''
      , title = this.props.instance.items.length ? '' 
              : prompt('Nome da categoria', value);

    if (title){
      this.props.onChangeTitle(this.props.instance.id, title.trim());
      this.refs.itemTextarea.getDOMNode().focus();
    }
  },

  fadeOutRow: function(uid){
    this.refs[uid].getDOMNode().classList.add('animated', 'fadeOutRight');
  },

  render: function(){
    var itemTextarea = null, spanClass = ['fui-cross'];

    if (this.props.editable){
      itemTextarea = <textarea
        rows="1"
        type="text"
        ref="itemTextarea"
        className="form-control"
        placeholder="Escreva o nome do prato"
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown} />
    } else {
      spanClass.push('hidden');
    }

    var items = this.props.instance.items.map(function(model){
      return (
        <tr key={model.uid} ref={model.uid}>
          <td>{model.attr('name')}</td>
          <td width="18">
            <span 
              title="Remover prato do cardápio"
              onClick={this.handleRemoved.bind(this, model)} 
              className={spanClass} />
          </td>
        </tr>
      );
    }.bind(this));

    return (
      <div className="block">
        <h6 onClick={this.changeTitle}>{this.props.instance.name}</h6>
        <table width="100%">
          <tbody>{items}</tbody>
        </table>
        {itemTextarea}
      </div>
    );
  }

});

module.exports = Block;
