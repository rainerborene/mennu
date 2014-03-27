require 'watir_helper'

describe 'login page', :js do

  let(:login_page) { LoginPage.new }

  it 'should authenticate successful' do
    login_page.login_with('couveflor@menu.com.br', 'dsa')
    browser.title.must_equal 'Cardápio • Mennu'
  end

  it 'should show validation message given wrong credentials' do
    login_page.login_with('couveflor@menu.com.br', 'errado')
    login_page.html.must_include 'O e-mail ou a senha inseridos estão incorretos.'
  end

end
