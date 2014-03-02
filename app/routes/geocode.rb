require 'lib/google/geocode'

module Menu
  module Routes
    class Geocode < Base
      get '/v1/geocode' do
        json Google::Geocode.locate params[:address]
      end
    end
  end
end
