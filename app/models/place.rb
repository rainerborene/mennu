require 'lib/find_or_create'

module Menu
  module Models
    class Place < Sequel::Model
      plugin :secure_password
      pg_array_to_many :payment_methods, array_type: :uuid
      one_to_many :categories, extend: FindOrCreate
      one_to_many :items

      def menu(time = Time.now)
        categories_dataset.items_published_at time
      end
    end
  end
end
