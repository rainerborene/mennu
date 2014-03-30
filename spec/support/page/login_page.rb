class LoginPage
  include Capybara::DSL

  def login_with(email, password)
    visit '/admin/login'
    within 'form' do
      fill_in 'email', with: email
      fill_in 'password', with: password
    end
    click_button 'Entrar'
  end

  def authenticate
    login_with 'couveflor@menu.com.br', 'teste'
  end
end
