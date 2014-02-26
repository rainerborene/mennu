module Menu
  module Uploaders
    class LogoUploader < CarrierWave::Uploader::Base
      include CarrierWave::MiniMagick

      def extension_white_list
        %w(jpg jpeg gif png)
      end
    end
  end
end
