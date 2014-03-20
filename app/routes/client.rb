require 'lib/autocomplete'
require 'sinatra/cookies'

module Menu
  module Routes
    class Client < Base
      helpers Sinatra::Cookies

      get '/setup.js' do
        content_type :javascript

        date = Time.parse(cookies[:last_date]) rescue Time.now

        categories = current_place.menu(date).all if current_place?

        @options = {
          autocomplete: Autocomplete.items,
          environment: settings.environment,
          csrfToken:   Rack::Csrf.csrf_token(env),
          place:       current_place,
          address:     current_place.try(:address),
          hours:       current_place.try(:business_hours),
          categories:  categories
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
