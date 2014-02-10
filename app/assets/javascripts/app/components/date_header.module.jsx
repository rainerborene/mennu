/** @jsx React.DOM */

var DateHeader = React.createClass({

  handleBack: function(event){
    event.preventDefault();
    this.props.onBack();
  },

  handleNext: function(event){
    event.preventDefault();
    this.props.onNext();
  },

  render: function(){
    return (
      <section className="date-header">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h4 className="pull-left">
                {this.props.currentDate.format('dddd')}
                <small>{this.props.currentDate.format('D [de] MMMM')}</small>
              </h4>

              <div className="pull-right">
                <ul className="nav nav-pills">
                  <li className="previous">
                    <a href="#" className="fui-arrow-left" onClick={this.handleBack}/>
                  </li>
                  <li className="next">
                    <a href="#" className="fui-arrow-right" onClick={this.handleNext}/>
                  </li>
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
