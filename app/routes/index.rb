require 'lib/autocomplete'
require 'sinatra/cookies'
require 'sinatra/content_for'

module Menu
  module Routes
    class Index < Base
      helpers Sinatra::Cookies
      helpers Sinatra::ContentFor

      get '/' do
        @title = 'Cardápio do dia'
        erb :landing, layout: false
      end

      get(/admin(\/.*)?/) do
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

        erb :admin, layout: false
      end

      get '/:id' do
        pass unless (@place = Place.find_by_pk_or_slug params[:id])
        @categories = @place.menu(@place.last_publication, true).order(:position).all
        @title = @place.name
        @view = PlacePresenter.new(self, @place)
        erb :place
      end
    end
  end
end
