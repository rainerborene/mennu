module Menu
  module Routes
    class Client < Base
      helpers do
        def csrf_token
          Rack::Csrf.csrf_token(env)
        end

        mime_type :javascript, 'application/javascript'
        mime_type :cache_manifest, 'text/cache-manifest'
      end

      get '/setup.js' do
        content_type :javascript

        menu = current_place.menu if current_place?

        @options = {
          autocomplete: Item.names,
          environment: settings.environment,
          csrfToken:   csrf_token,
          place:       current_place,
          address:     current_place.try(:address),
          hours:       current_place.try(:business_hours) || [],
          menu:        menu
        }

        erb :setup
      end

      get '/assets/*' do
        env['PATH_INFO'].sub!(%r{^/assets}, '')
        settings.assets.call(env)
      end

      get '/' do
        erb :site
      end
    end
  end
end
