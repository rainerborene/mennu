module Menu
  module Routes
    class Index < Base
      get '/' do
        erb :index
      end

      get /\/admin(\/.*)?/ do
        erb :admin
      end
    end
  end
end
