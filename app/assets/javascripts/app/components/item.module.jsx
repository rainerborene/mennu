/** @jsx React.DOM */

var j    = jQuery

var Item = React.createClass({

  handleRemoved: function(){
    j(event.target).parents('tr').addClass('animated fadeOutRight');
    setTimeout(function(){
      this.props.onRemoved(this.props.title);
    }.bind(this), 600);
  },

  render: function(){
    return (
      <tr>
        <td>{this.props.title}</td>
        <td width="18">
          <span onClick={this.handleRemoved} className="fui-cross-inverted text-primary"></span>
        </td>
      </tr>
    );
  }

});

module.exports = Item;
