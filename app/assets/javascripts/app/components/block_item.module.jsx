/** @jsx React.DOM */

var j    = jQuery;

var BlockItem = React.createClass({

  handleRemoved: function(){
    this.props.model.destroy();

    j(event.target).parents('tr').addClass('animated fadeOutRight');

    setTimeout(function(){
      this.props.onRemoved(this.props.title);
    }.bind(this), 600);
  },

  render: function(){
    var removeButton;

    if (this.props.deletable){
      removeButton = (
        <span onClick={this.handleRemoved} className="fui-cross-inverted text-primary"></span>
      );
    }

    return (
      <tr>
        <td>{this.props.model.attr('name')}</td>
        <td width="18">{removeButton}</td>
      </tr>
    );
  }

});

module.exports = BlockItem;
