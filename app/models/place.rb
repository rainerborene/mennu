require 'lib/find_or_create'
require 'lib/carte_association_methods'

module Menu
  module Models
    class Place < Sequel::Model
      plugin :secure_password
      pg_array_to_many :payment_methods, array_type: :uuid
      one_to_many :categories, extend: FindOrCreate
      one_to_many :items, extend: CarteAssociationMethods

      def menu_at(date)
        items = items_dataset.at(date).eager_category.all
        items.group_by {|item| item.category.name }
      end

      def menu
        menu_at Date.today
      end
    end
  end
end
