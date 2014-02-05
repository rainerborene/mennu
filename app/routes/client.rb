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

        menu = current_user.menu if current_user?

        @options = {
          autocomplete: Item.names,
          environment: settings.environment,
          csrfToken:   csrf_token,
          user:        current_user,
          menu:        menu
        }

        erb :setup
      end

      get '/assets/*' do
        env['PATH_INFO'].sub!(%r{^/assets}, '')
        settings.assets.call(env)
      end
    end
  end
end
