require 'lib/autocomplete'

module Menu
  module Routes
    class Client < Base
      get '/setup.js' do
        content_type :javascript

        menu = current_place.menu if current_place?

        @options = {
          autocomplete: Autocomplete.items,
          environment: settings.environment,
          csrfToken:   Rack::Csrf.csrf_token(env),
          place:       current_place,
          address:     current_place.try(:address),
          hours:       current_place.try(:business_hours),
          menu:        menu
        }

        erb :setup
      end

      get '/' do
        erb :site
      end

      get(/admin(\/.*)?/) do
        erb :admin
      end
    end
  end
end
