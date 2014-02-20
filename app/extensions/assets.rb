require 'bourbon'

require 'lib/sass/script/functions'
require 'lib/react/jsx'

module Menu
  module Extensions
    module Assets extend self
      module Helpers
        def asset_path(name)
          asset = settings.assets[name]
          raise UnknownAsset, "Unknown asset: #{name}" unless asset
          "#{settings.asset_host}/assets/#{asset.digest_path}"
        end
      end

      def registered(app)
        app.set :assets, assets = Sprockets::Environment.new(app.settings.root)
        app.set :asset_host, ENV['ASSET_HOST']

        assets.append_path 'app/assets/stylesheets'
        assets.append_path 'app/assets/javascripts'
        assets.append_path 'app/assets/images'

        assets.append_path 'vendor/assets/stylesheets'
        assets.append_path 'vendor/assets/javascripts'
        assets.append_path 'vendor/assets/images'
        assets.append_path 'vendor/assets/fonts'

        app.configure :development do
          assets.cache = Sprockets::Cache::FileStore.new('./tmp')
        end

        app.configure :production do
          assets.js_compressor  = Closure::Compiler.new
          assets.css_compressor = YUI::CssCompressor.new
        end

        React::JSX.setup(assets)

        app.helpers Helpers
      end
    end
  end
end
