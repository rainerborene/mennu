module Menu
  module Extensions
    module JSON extend self
      module Helpers
        def json(value, options = {})
          content_type :json
          value.to_json(options)
        end

        def json?
          request.media_type == 'application/json'
        end

        def parse_json
          ::JSON.parse request.body.read, symbolize_names: true
        end

        def json_params
          @json_params ||= (parse_json if json? && request.body.rewind)
        end
      end

      def registered(app)
        app.helpers Helpers
      end
    end
  end
end
