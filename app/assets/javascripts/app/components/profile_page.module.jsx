/** @jsx React.DOM */

/* jslint maxlen: 81 */

'use strict';

var React      = require('react'),
    Mixins     = require('app/mixins'),
    Place      = require('app/models/place'),
    Hour       = require('app/models/hour'),
    Header     = require('app/components/header'),
    Addresses  = require('app/components/addresses'),
    HoursTable = require('app/components/hours_table');


var ProfilePage = React.createClass({

  mixins: [Mixins.AntiScroll, Mixins.LaddaButton],

  componentDidMount: function() {
    this.props.place.hours.bind('add remove', this.forceUpdate.bind(this, null));
    this.props.place.bind('sync', this.stopLadda);

    $(this.refs.description.getDOMNode()).autosize();
  },

  componentWillUnmount: function() {
    this.props.place.hours.unbind('add remove');
    this.props.place.unbind('sync');
  },

  handleSubmit: function(event) {
    this.props.place.save({}, {
      processData: false,
      contentType: false,
      data: new FormData(event.target)
    });

    event.preventDefault();
  },

  /* jshint ignore:start */

  render: function() {
    return (
      <div className="app">
        <Header />

        <div className="antiscroll-wrap" ref="wrap">
          <div className="antiscroll-inner">
            <header className="header-page">
              <div className="container">
                <h2>Sobre o estabelecimento</h2>
                <p className="legend">Essas informações aparecem em sua página pública.</p>
              </div>
            </header>

            <div className="container profile">
              <form onSubmit={this.handleSubmit}>
                <table className="table-details">
                  <tbody>
                    <tr className="first">
                      <th>Logo</th>
                      <td>
                        <span className="btn-file">
                          <span className="fui-upload"></span>
                          <span>&nbsp;&nbsp;Selecionar imagem</span>
                          <input type="file" name="place[logo]" />
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th>Nome</th>
                      <td>
                        <input type="text" name="place[name]"
                          defaultValue={this.props.place.get('name')}
                          required />
                      </td>
                    </tr>
                    <tr>
                      <th>Website</th>
                      <td>
                        <input type="text" name="place[website]"
                          defaultValue={this.props.place.get('website')}
                          required />
                      </td>
                    </tr>
                    <tr>
                      <th>Facebook</th>
                      <td>
                        <input type="text" name="place[facebook]"
                          defaultValue={this.props.place.get('facebook')}
                          required />
                      </td>
                    </tr>
                    <tr>
                      <th>Instagram</th>
                      <td>
                        <input type="text" name="place[instagram]"
                          defaultValue={this.props.place.get('instagram')}
                          required />
                      </td>
                    </tr>
                    <tr>
                      <th>Endereço Mennu</th>
                      <td>
                        <span>http://mennu.com.br/{this.props.place.get('slug')}</span>
                      </td>
                    </tr>
                    <tr>
                      <th className="description-label">Sobre</th>
                      <td>
                        <textarea rows="5" name="place[description]" ref="description"
                          defaultValue={this.props.place.get('description')}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th></th>
                      <td>
                        <button type="submit" className="ladda-button"
                          data-style="slide-down" ref="submit">
                            <span className="ladda-label">Editar</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>

              <form onSubmit={this.handleSubmit} className="credentials-form">
                <h4>Credenciais</h4>
                <p className="legend">Seu e-mail e senha de autenticação.</p>
                <div className="form-group">
                  <label>E-mail</label>
                  <input type="email" name="place[email]" required
                    defaultValue={this.props.place.get('email')} />
                </div>
                <div className="form-group">
                  <label>Nova senha</label>
                  <input type="password" name="place[password]" required />
                </div>
                <div className="form-group">
                  <label>Confirmação de senha</label>
                  <input type="password" name="place[password_confirmation]" required />
                </div>

                <button className="ladda-button address-submit" type="submit"
                  data-style="slide-down" ref="submit">

                    <span className="ladda-label">Editar</span>
                </button>
              </form>

              <Addresses ref="address" address={this.props.place.address} />

              <h4>Horário de funcionamento</h4>
              <p className="legend">Mostramos em sua página um selo aberto ou
                fechado de acordo com a hora atual.</p>

              <HoursTable hours={this.props.place.hours} />

              <form action="https://pagseguro.uol.com.br/v2/pre-approvals/request.html"
                method="post" className="pagseguro">
                  <h4>Pagamento</h4>
                  <p className="legend">O pagamento do plano contratado é efetuado
                    de forma recorrente pelo PagSeguro.</p>

                  <input type="hidden" name="code" value="9179E8727878123994FA8F9EF29EDC70" />
                  <input type="image"
                    src="https://p.simg.uol.com.br/out/pagseguro/i/botoes/assinaturas/205x30-assinar-azul.gif"
                    name="submit" width="205" height="30" />

              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* jshint ignore:end */

});

module.exports = ProfilePage;
