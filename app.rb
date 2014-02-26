require 'bundler/setup'

# Setup load paths
$: << File.expand_path('../', __FILE__)
$: << File.expand_path('../lib', __FILE__)

require 'dotenv'

Dotenv.load

require 'sprockets/commonjs'
require 'sinatra/sequel'
require 'sinatra/reloader'
require 'rack/csrf'
require 'active_support/core_ext/array'
require 'active_support/core_ext/hash'

require 'app/extensions'
require 'app/models'
require 'app/routes'

module Menu
  class App < Sinatra::Application
    configure :development do
      register Sinatra::Reloader
    end

    configure do
      disable :method_override
      disable :static

      set :protection, except: :session_hijacking

      set :erb, escape_html: true

      set :database, lambda {
        ENV['DATABASE_URL'] || "postgres://localhost:5432/menu_#{environment}"
      }

      set :sessions,
        httponly: true,
        secure: false,
        expire_after: 1.year,
        secret: ENV['SESSION_SECRET']
    end

    use Rack::Deflater
    use Rack::Runtime
    use Rack::Csrf

    use Menu::Routes::Site
    use Menu::Routes::Admin
    use Menu::Routes::Items
    use Menu::Routes::Hours
    use Menu::Routes::Session
    use Menu::Routes::Client
  end
end

# To easily access models in the console
include Menu::Models
