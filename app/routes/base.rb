module Menu
  module Routes
    class Base < Sinatra::Application
      configure do
        set :views, 'app/views'
        set :root, File.expand_path('../../../', __FILE__)
        set :erb, escape_html: true

        disable :method_override
        disable :protection
        disable :static
      end

      register Extensions::Auth
      register Extensions::Assets
      register Extensions::JSON
    end
  end
end
