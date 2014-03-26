class LoginPage < Test::Page
  element { browser.forms.first }

  def setup
    browser.goto 'http://localhost:3000/admin/login'
  end

  def login_with(email, password)
    text_field(:id => 'email').set(email)
    text_field(:id => 'password').set(password)
    submit && sleep(0.2)
  end
end
