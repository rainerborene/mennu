module Menu
  module Uploaders
    class LogoUploader < CarrierWave::Uploader::Base
      include CarrierWave::MiniMagick

      version :thumb do
        process resize_to_fill: [160, 160]
      end

      def store_dir
        "#{model.class.table_name}/#{mounted_as}/#{model.id}"
      end

      def extension_white_list
        %w(jpg jpeg gif png)
      end
    end
  end
end
