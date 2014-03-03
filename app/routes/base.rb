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

      error Sequel::ValidationFailed do
        status 406
        json error: {
          type: 'validation_failed',
          messages: env['sinatra.error'].errors
        }
      end

      error Sequel::NoMatchingRow do
        status 404
        json error: {type: 'unknown_record'}
      end
    end
  end
end
