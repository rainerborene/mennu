module Menu
  module Uploaders
    class LogoUploader < CarrierWave::Uploader::Base
      include CarrierWave::MiniMagick

      version :thumb do
        process resize_to_fill: [160, 160]
      end

      def extension_white_list
        %w(jpg jpeg gif png)
      end
    end
  end
end
