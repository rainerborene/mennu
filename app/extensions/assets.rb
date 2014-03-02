require 'bourbon'
require 'sprockets'
require 'sprockets/helpers'
require 'sprockets/commonjs'
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

        if app.production?
          require 'yui/compressor'
          require 'lib/sprockets/cache/redis_store'
        end

        app.configure :development do
          assets.cache = Sprockets::Cache::FileStore.new('./tmp')
        end

        app.configure :production do
          assets.cache          = Sprockets::Cache::RedisStore.new
          assets.js_compressor  = YUI::JavaScriptCompressor.new
          assets.css_compressor = YUI::CssCompressor.new({
            jar_file: File.expand_path('~/yuicompressor/build/yuicompressor-2.4.8.jar')
          })
        end

        React::JSX.setup(assets)

        app.helpers Sprockets::Helpers
      end
    end
  end
end
