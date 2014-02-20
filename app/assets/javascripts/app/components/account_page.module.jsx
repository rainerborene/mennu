/** @jsx React.DOM */

var AntiScroll = require('app/mixins').AntiScroll
  , HoursTable = require('app/components/hours_table')
  , Header     = require('app/components/header')
  , Session    = require('app/models/session');

var AccountPage = React.createClass({

  mixins: [AntiScroll],

  getInitialState: function(){
    return { instance: Session.user };
  },

  render: function(){
    return (
      <div className="app">
        <Header pathname={this.props.pathname} />

        <div className="antiscroll-wrap" ref="wrap">
          <div className="antiscroll-inner">
            <header className="header-page">
              <div className="container">
                <h2>Sobre o estabelecimento</h2>
                <p className="legend">Essas informações aparecem em sua página pública e resultados de pesquisa.</p>
              </div>
            </header>

            <div className="container account">
              <form onSubmit={this.handleSubmit}>
                <table className="table-details">
                  <tbody>
                    <tr className="first">
                      <th>Nome</th>
                      <td>
                        <input type="text" defaultValue={this.state.instance.attr('name')} required />
                      </td>
                    </tr>
                    <tr>
                      <th>E-mail</th>
                      <td>
                        <input type="email" defaultValue={this.state.instance.attr('email')} required />
                      </td>
                    </tr>
                    <tr>
                      <th>Website</th>
                      <td>
                        <input type="text" defaultValue={this.state.instance.attr('website')} required />
                      </td>
                    </tr>
                    <tr>
                      <th>Endereço Mennu</th>
                      <td>
                        <span>http://mennu.com.br/</span>
                        <input type="text" defaultValue={this.state.instance.attr('slug')} required className="slug-field"/>
                      </td>
                    </tr>
                    <tr>
                      <th className="description-label">Sobre</th>
                      <td>
                        <textarea rows="5"/>
                      </td>
                    </tr>
                    <tr>
                      <th>Logotipo</th>
                      <td>
                        <input type="file"/>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <h4>Horário de funcionamento</h4>
                <p className="legend">Mostramos em sua página um selo aberto ou fechado de acordo com a hora atual.</p>

                <HoursTable />

                <h4>Endereço</h4>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = AccountPage;
