require 'pry-meta'

module Menu
  module Models
    class Category < Sequel::Model
      one_to_many :places
      one_to_many :items

      def before_validation
        self.slug = name.parameterize
      end

      def validate
        super
        validates_presence [:name, :place_id]
      end
    end
  end
end
