require 'bundler'

# Setup load paths
Bundler.require
$: << File.expand_path('../', __FILE__)
$: << File.expand_path('../lib', __FILE__)

Dotenv.load

require 'sprockets/commonjs'
require 'sinatra/sequel'
require 'rack/csrf'

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
        key: '_menu_session',
        httponly: true,
        secure: false,
        expire_after: 3600,
        secret: ENV['SESSION_SECRET']
    end

    use Rack::Deflater
    use Rack::Runtime
    use Rack::Csrf

    use Menu::Routes::Index
    use Menu::Routes::Items
    use Menu::Routes::Session
    use Menu::Routes::Client
  end
end

# To easily access models in the console
include Menu::Models
