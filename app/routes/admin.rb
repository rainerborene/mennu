module Menu
  module Routes
    class Admin < Base
      post '/admin/login' do
        json authenticate(:place, scope: :place)
      end

      get '/admin/logout' do
        logout :place
        redirect '/'
      end

      get /admin(\/.*)?/ do
        erb :admin
      end
    end
  end
end
