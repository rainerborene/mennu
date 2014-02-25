/** @jsx React.DOM */

var AntiScroll = require('app/mixins').AntiScroll
  , HoursTable = require('app/components/hours_table')
  , Header     = require('app/components/header')
  , Session    = require('app/models/session');

var ProfilePage = React.createClass({

  mixins: [AntiScroll],

  getInitialState: function(){
    return { instance: Session.place };
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

            <div className="container profile">
              <form action="/admin/profile" onSubmit={this.handleSubmit}>
                <table className="table-details">
                  <tbody>
                    <tr className="first">
                      <th>Logotipo</th>
                      <td>
                        <span className="btn-file">                        
                          <span className="fui-upload"></span>&nbsp;&nbsp;Selecionar imagem
                          <input type="file" name="logo" />
                        </span>
                      </td>
                    </tr>
                    <tr>
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
                      <th></th>
                      <td>
                        <input type="submit" value="Salvar alterações" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>

              <h4>Horário de funcionamento</h4>
              <p className="legend">Mostramos em sua página um selo aberto ou fechado de acordo com a hora atual.</p>

              <HoursTable />

              <h4>Endereço</h4>

              <h4>Pagamento</h4>
              <p className="legend">O pagamento do plano contratado é efetuado de forma recorrente pelo PagSeguro.</p>
              <form action="https://pagseguro.uol.com.br/v2/pre-approvals/request.html" method="post" className="pagseguro">
                <input type="hidden" name="code" value="9179E8727878123994FA8F9EF29EDC70" />
                <input type="image" src="https://p.simg.uol.com.br/out/pagseguro/i/botoes/assinaturas/205x30-assinar-azul.gif" name="submit" width="205" height="30" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = ProfilePage;
