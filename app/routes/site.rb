module Menu
  module Routes
    class Site < Base
      get '/' do
        erb :index
      end

      get '/admin/logout' do
        session.destroy
        redirect '/'
      end

      get /admin(\/.*)?/ do
        erb :admin
      end
    end
  end
end
