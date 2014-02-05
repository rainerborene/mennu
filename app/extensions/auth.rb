require 'lib/warden/strategies'

module Menu
  module Extensions
    module Auth extend self
      module Helpers
        def warden
          request.env['warden']
        end

        def authenticated?(scope=nil)
          scope ? warden.authenticated?(scope) : warden.authenticated?
        end

        def authenticate(*args)
          warden.authenticate!(*args)
        end

        def logout(scopes=nil)
          scopes ? warden.logout(scopes) : warden.logout(warden.config.default_scope)
        end

        def user(scope=nil)
          scope ? warden.user(scope) : warden.user
        end

        def current_user?
          !!current_user
        end

        alias_method :current_user, :user
      end

      def registered(app)
        app.use Warden::Manager do |manager|
          manager.default_strategies :admin
          manager.failure_app = Menu::Routes::Session
          manager.serialize_into_session {|model| model.id }
          manager.serialize_from_session {|id| Place[id] }
        end

        app.use OmniAuth::Builder do
          provider :facebook, ENV['FACEBOOK_KEY'], ENV['FACEBOOK_SECRET']
        end

        app.set :auth do |type|
          condition do
            error 403 unless current_user?
          end
        end

        app.helpers Helpers
      end
    end
  end
end
