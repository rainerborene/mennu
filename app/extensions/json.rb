module Menu
  module Extensions
    module JSON extend self
      module Helpers
        def json(value, options = {})
          content_type :json
          value.to_json(options)
        end

        def json_params
          if request.media_type == 'application/json' && request.body.length != 0
            @json_params ||= MultiJson.load request.body.read, symbolize_keys: true
          end
        end
      end

      def registered(app)
        app.helpers Helpers
      end
    end
  end
end
