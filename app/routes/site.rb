module Menu
  module Routes
    class Site < Base
      get '/' do
        erb :site
      end
    end
  end
end
