module Menu
  module Routes
    class Base < Sinatra::Application
      configure do
        set :views, 'app/views'
        set :root, File.expand_path('../../../', __FILE__)
        set :erb, escape_html: true, layout_options: { views: 'app/views/layouts' }

        disable :method_override
        disable :protection
        disable :static

        enable :use_code
      end

      register Extensions::Auth
      register Extensions::Assets
    end
  end
end
