/** @jsx React.DOM */

var AntiScroll = require('app/mixins').AntiScroll
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
                <p>Essas informações aparecem em seu perfil público, resultados de pesquisa, e mais além.</p>
              </div>
            </header>

            <div className="container account">
              <div className="form-group">
                <table>
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
                        <input type="file" />
                      </td>
                    </tr>
                  </tbody>
                </table>

                <h4>Endereço</h4>
                
                <h4>Horário de funcionamento</h4>
                
                <h4>Cobrança</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = AccountPage;
