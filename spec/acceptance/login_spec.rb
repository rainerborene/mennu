require 'spec_helper'

describe 'login' do

  let(:login_page) { LoginPage.new }

  it 'successful authentication' do
    Place.make.save
    login_page.login_with('couveflor@menu.com.br', 'teste')
    wait_for_ajax
    title.must_equal 'Cardápio • Mennu'
  end

  it 'show validation message given wrong credentials' do
    login_page.login_with('couveflor@menu.com.br', 'errado')
    login_page.html.must_include 'O e-mail ou a senha inseridos estão incorretos.'
  end

end
