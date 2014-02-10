/** @jsx React.DOM */

var j = jQuery;

var Header = React.createClass({

  componentDidMount: function(){
    j('.dropdown-toggle').dropdown();
  },

  componentWillUnmount: function(){
    j('.dropdown-toggle').off('click.bs.dropdown');
  },

  render: function(){
    return (
      <nav className="navbar navbar-default" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <h1 className="logo">Mennu</h1>
          </div>

          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-right">
              <li className="active"><a href="/admin">Cardápio</a></li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  <span className="visible-sm visible-xs"><span className="fui-gear"></span></span>
                  <span className="visible-md visible-lg"><span className="fui-gear"></span></span>
                </a>

                <span className="dropdown-arrow"></span>
                <ul className="dropdown-menu">
                  <li><a href="/admin/profile">Minha conta</a></li>
                  <li><a href="/logout">Sair</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

});

module.exports = Header;
