/** @jsx React.DOM */

'use strict';

var React      = require('react'),
    Mixins     = require('app/mixins'),
    Session    = require('app/models/session'),
    Place      = require('app/models/place'),
    Hour       = require('app/models/hour'),
    Header     = require('app/components/header'),
    Addresses  = require('app/components/addresses'),
    HoursTable = require('app/components/hours_table'),
    ProfilePage;


ProfilePage = React.createClass({

  mixins: [Mixins.AntiScroll, Mixins.LaddaButton],

  componentDidMount: function() {
    Hour.bind('add', this.refresh);
    Hour.bind('remove', this.refresh);
    Hour.bind('destroy', this.refresh);
  },

  componentWillUnmount: function() {
    Hour.unbind('add');
    Hour.unbind('remove');
    Hour.unbind('destroy');
  },

  handleSubmit: function(event) {
    var form = document.forms[0],
        data = new FormData(form);

    this.ladda.start();

    Place.update(data, {
      success: function() {
        Session.place.attr(data);
      },
      complete: function() {
        this.stopLadda();
      }.bind(this)
    });

    event.preventDefault();
  },

  refresh: function() {
    this.forceUpdate();
  },

  /* jshint ignore:start */

  render: function() {
    return (
      <div className="app">
        <Header pathname={this.props.pathname} />

        <div className="antiscroll-wrap" ref="wrap">
          <div className="antiscroll-inner">
            <header className="header-page">
              <div className="container">
                <h2>Sobre o estabelecimento</h2>
                <p className="legend">Essas informações aparecem em sua página
                  pública e resultados de pesquisa.</p>
              </div>
            </header>

            <div className="container profile">
              <form onSubmit={this.handleSubmit} >
                <table className="table-details">
                  <tbody>
                    <tr className="first">
                      <th>Logotipo</th>
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
                          defaultValue={this.props.instance.attr('name')}
                          required />
                      </td>
                    </tr>
                    <tr>
                      <th>E-mail</th>
                      <td>
                        <input type="email" name="place[email]"
                          defaultValue={this.props.instance.attr('email')}
                          required />
                      </td>
                    </tr>
                    <tr>
                      <th>Website</th>
                      <td>
                        <input type="text" name="place[website]"
                          defaultValue={this.props.instance.attr('website')}
                          required />
                      </td>
                    </tr>
                    <tr>
                      <th>Endereço Mennu</th>
                      <td>
                        <span>http://mennu.com.br/</span>
                        <input type="text" name="place[slug]"
                          defaultValue={this.props.instance.attr('slug')}
                          required className="slug-field"/>
                      </td>
                    </tr>
                    <tr>
                      <th className="description-label">Sobre</th>
                      <td>
                        <textarea rows="5" name="place[description]"
                          defaultValue={this.props.instance.attr('description')}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th></th>
                      <td>
                        <button type="submit" className="ladda-button"
                          data-style="slide-down" ref="submit">
                            <span className="ladda-label">Salvar alterações</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>

              <h4>Endereço</h4>
              <p className="legend">Escreva o endereço e telefone do seu
                estabelecimento nos campos abaixo.</p>

              <Addresses ref="address" instance={Session.address} />

              <h4>Horário de funcionamento</h4>
              <p className="legend">Mostramos em sua página um selo aberto ou
                fechado de acordo com a hora atual.</p>

              <HoursTable hours={Hour.sortBy('weekday')} />

              <h4>Pagamento</h4>
              <p className="legend">O pagamento do plano contratado é efetuado
                de forma recorrente pelo PagSeguro.</p>

              <form
                action="https://pagseguro.uol.com.br/v2/pre-approvals/request.html"
                method="post" className="pagseguro">
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

