module Menu
  module Routes
    class Admin < Base
      post '/v1/place', auth: :place do
        current_place.set params[:place]
        json current_place.save
      end

      post '/admin/login' do
        json authenticate(:place, scope: :place)
      end

      get '/admin/logout' do
        logout :place
        redirect '/'
      end

      get(/admin(\/.*)?/) do
        erb :admin
      end
    end
  end
end
