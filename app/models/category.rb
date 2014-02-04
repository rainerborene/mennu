module Menu
  module Models
    class Category < Sequel::Model
      one_to_many :items
    end
  end
end
