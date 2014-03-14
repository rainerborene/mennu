require 'bourbon'
require 'sprockets/commonjs'
require 'sprockets/helpers'
require 'lib/react/jsx'

module Menu
  module Extensions
    module Assets extend self
      def registered(app)
        app.set :assets, assets = Sprockets::Environment.new(app.settings.root)

        assets.append_path 'app/assets/stylesheets'
        assets.append_path 'app/assets/javascripts'
        assets.append_path 'app/assets/images'

        assets.append_path 'vendor/assets/stylesheets'
        assets.append_path 'vendor/assets/javascripts'
        assets.append_path 'vendor/assets/images'
        assets.append_path 'vendor/assets/fonts'

        Sprockets::Helpers.configure do |config|
          config.environment = assets
          config.prefix      = "/assets"
          config.digest      = app.production?
        end

        require 'lib/sprockets/cache/redis_store' if app.production?

        app.configure :development do
          assets.cache = Sprockets::Cache::FileStore.new('./tmp')
        end

        app.configure :production do
          assets.cache          = Sprockets::Cache::RedisStore.new
          assets.js_compressor  = :uglifier
          assets.css_compressor = :scss
        end

        app.get '/assets/*' do
          env['PATH_INFO'].sub!(%r{^/assets}, '')
          settings.assets.call(env)
        end

        React::JSX.setup(assets)

        app.helpers Sprockets::Helpers
      end
    end
  end
end
