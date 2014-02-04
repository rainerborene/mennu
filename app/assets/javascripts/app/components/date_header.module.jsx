/** @jsx React.DOM */

var DateHeader = React.createClass({

  propTypes: {
    onDateChange: React.PropTypes.func.isRequired,
    initialDate: React.PropTypes.object.isRequired
  },

  getInitialState: function(){
    return { date: this.props.initialDate };
  },

  handleBack: function(event){
    event.preventDefault();
    this.props.onDateChange(this.state.date, function(){
      this.setState({ date: this.state.date.subtract('days', 1) });
    }.bind(this));
  },

  handleNext: function(event){
    event.preventDefault();
    this.props.onDateChange(this.state.date, function(){
      this.setState({ date: this.state.date.add('days', 1) });
    }.bind(this));
  },

  render: function(){
    return (
      <section className="date-header">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h4 className="pull-left">
                {this.state.date.format('dddd')}
                <small>{this.state.date.format('D [de] MMMM')}</small>
              </h4>

              <div className="pull-right">
                <ul className="nav nav-pills">
                  <li className="previous"><a href="#" className="fui-arrow-left" onClick={this.handleBack}></a></li>
                  <li className="next"><a href="#" className="fui-arrow-right" onClick={this.handleNext}></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

});

module.exports = DateHeader;
