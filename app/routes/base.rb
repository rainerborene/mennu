module Menu
  module Routes
    class Base < Sinatra::Application
      configure do
        set :root, App.root
        set :erb, escape_html: true
        set :views, 'app/views'

        disable :method_override
        disable :protection
        disable :static
      end

      register Extensions::Auth
      register Extensions::Assets
      register Extensions::JSON

      before do
        if settings.production? and current_place?
          Raven.user_context name: current_place.name, email: current_place.email
        end
      end

      error Sequel::ValidationFailed do
        status 406
        json error: {
          type: 'validation_failed',
          messages: env['sinatra.error'].errors
        }
      end

      error Sequel::NoMatchingRow do
        status 404
        json error: { type: 'unknown_record' }
      end

      helpers Helpers
    end
  end
end
