module Sass
  module Script
    module Functions
      def inline_image(path)
        assert_type path, :String
        static_asset = sprockets.find_asset(path.value)
        data = [static_asset.source].flatten.pack('m').gsub("\n", "")
        mime_type = compute_mime_type(static_asset.to_path)
        url = "url('data:#{mime_type};base64,#{data}')"
        Sass::Script::String.new(url)
      end

      protected

      def compute_mime_type(path)
        case path
        when /\.png$/i
          'image/png'
        when /\.jpe?g$/i
          'image/jpeg'
        when /\.gif$/i
          'image/gif'
        when /\.svg$/i
          'image/svg+xml'
        when /\.otf$/i
          'font/opentype'
        when /\.eot$/i
          'application/vnd.ms-fontobject'
        when /\.ttf$/i
          'font/truetype'
        when /\.woff$/i
          'application/x-font-woff'
        when /\.off$/i
          'font/openfont'
        when /\.([a-zA-Z]+)$/
          "image/#{Regexp.last_match(1).downcase}"
        end
      end

      def sprockets
        Menu::Routes::Base.assets
      end
    end
  end
end
