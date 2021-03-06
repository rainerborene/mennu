require 'bundler/setup'

# Setup load paths
$LOAD_PATH << File.expand_path('../', __FILE__)
$LOAD_PATH << File.expand_path('../lib', __FILE__)

require 'dotenv'
Dotenv.load

require 'rack/csrf'
require 'sinatra/sequel'
require 'carrierwave/sequel'
require 'active_support/json'
require 'active_support/core_ext/array'
require 'active_support/core_ext/hash'
require 'mail'

require 'app/extensions'
require 'app/presenters'
require 'app/uploaders'
require 'app/helpers'
require 'app/models'
require 'app/routes'

Encoding.default_external = Encoding::UTF_8

I18n.load_path = Dir[File.join(__dir__, 'app', 'locales', '*.yml')]
I18n.default_locale = 'pt-BR'
I18n.reload!

module Menu
  class App < Sinatra::Application
    configure do
      disable :method_override
      disable :static

      set :root, __dir__
      set :erb, escape_html: true
      set :protection, except: :session_hijacking
      set :database, lambda {
        ENV['DATABASE_URL'] || "postgres://localhost:5432/menu_#{environment}"
      }

      set :sessions,
        httponly: true,
        secure: false,
        expire_after: 1.year,
        secret: ENV['SESSION_SECRET']

      Mail.defaults do
        delivery_method :smtp, {
          address:              ENV['MAIL_ADDRESS'],
          domain:               ENV['MAIL_DOMAIN'],
          user_name:            ENV['MAIL_USERNAME'],
          password:             ENV['MAIL_PASSWORD'],
          authentication:       :login,
          port:                 465,
          tls:                  true,
          ssl:                  true
        }
      end
    end

    configure :production do
      require 'raven'

      Raven.configure do |config|
        config.dsn = ENV['SENTRY_DSN']
        config.excluded_exceptions = [
          'Sequel::NoMatchingRow',
          'Sequel::ValidationFailed'
        ]
      end

      CarrierWave.configure do |config|
        config.storage = :fog
        config.fog_use_ssl_for_aws = false
        config.fog_directory = ENV['FOG_DIRECTORY']
        config.fog_credentials = {
          provider:              ENV['FOG_PROVIDER'],
          region:                ENV['FOG_REGION'],
          aws_access_key_id:     ENV['AWS_ACCESS_KEY'],
          aws_secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
          path_style:            true
        }
      end
    end

    configure :development do
      require 'sinatra/reloader'

      CarrierWave.configure do |config|
        config.storage = :file
        config.root = "#{settings.root}/public"
        config.store_dir = "#{settings.root}/public/uploads"
      end
    end

    configure :test do
      Mail.defaults do
        delivery_method :file
      end
    end

    register Sinatra::Reloader if development?

    use Raven::Rack if production?
    use Rack::Deflater
    use Rack::Runtime
    use Rack::Csrf

    use Menu::Routes::Session
    use Menu::Routes::Geocode
    use Menu::Routes::Places
    use Menu::Routes::Hours
    use Menu::Routes::Items
    use Menu::Routes::Index
    use Menu::Routes::Messages
  end
end

# To easily access models in the console
include Menu::Models
include Menu::Uploaders
include Menu::Presenters
