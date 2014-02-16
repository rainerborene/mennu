require 'lib/find_or_create'

module Menu
  module Models
    class Place < Sequel::Model
      plugin :secure_password
      one_to_many :items
      one_to_many :categories, extend: FindOrCreate
      one_to_one :subscription

      def menu(time = Time.now)
        categories_dataset.items_at(time)
      end
    end
  end
end
