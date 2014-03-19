/** @jsx React.DOM */

'use strict';

var React = require('react');

var MenuBlock = React.createClass({

  componentDidMount: function() {
    var blood = require('app/state').Bloodhound;

    if (this.refs.itemInput) {
      $(this.refs.itemInput.getDOMNode())
        .typeahead(null, { source: blood.ttAdapter() })
        .bind('typeahead:selected', this.handleSelected);
    }
  },

  componentWillUnmount: function() {
    if (this.refs.itemInput) {
      $(this.refs.itemInput.getDOMNode()).typeahead('destroy');
    }
  },

  handleKeyDown: function(event) {
    var value = event.target.value.trim();

    if (event.keyCode === 13 && value.length !== 0) {
      this.props.onSave(value);
      this.closeTypeahead();
    }
  },

  handleSelected: function(event, token) {
    var value = token.value.trim();
    if (value.length) {
      this.props.onSave(value);
      this.closeTypeahead();
    }
  },

  handleRemoved: function(model) {
    this.props.onDestroy(model, this);
  },

  closeTypeahead: function() {
    $(this.refs.itemInput.getDOMNode()).val('')
      .typeahead('close')
      .typeahead('val', '');
  },

  changeTitle: function() {
    var name  = this.props.instance.name,
        value = name !== 'Nova Categoria' ? name : '',
        title = this.props.instance.items.length ? ''
              : prompt('Nome da categoria', value);

    if (title) {
      this.props.onChangeTitle(this.props.instance.id, title.trim());
      this.refs.itemInput.getDOMNode().focus();
    }
  },

  /* jshint ignore:start */

  render: function() {
    var itemInput = null, spanClass = ['fui-cross'];

    if (this.props.editable) {
      itemInput = <input
        type="text"
        ref="itemInput"
        className="form-control"
        placeholder="Escreva o nome do prato"
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown} />
    } else {
      spanClass.push('hidden');
    }

    var items = this.props.instance.items.map(function(model) {
      return (
        <tr key={model.cid} ref={model.cid}>
          <td>{model.get('name')}</td>
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
      <div className="menu-block">
        <h4 onClick={this.changeTitle}>{this.props.instance.name}</h4>
        <table width="100%">
          <tbody>{items}</tbody>
        </table>
        {itemInput}
      </div>
    );
  }

  /* jshint ignore:end */

});

module.exports = MenuBlock;

