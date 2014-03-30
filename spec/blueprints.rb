require 'machinist'

Sequel::Model.extend Machinist::Machinable

Place.blueprint do
  name { 'Couve Flor' }
  slug { 'couve-flor' }
  email { 'couveflor@menu.com.br' }
  password { 'teste' }
  password_confirmation { 'teste' }
  description { 'Lorem Ipsum' }
  logo { 'app/assets/images/logo.png' }
end
