module Menu
  module Models
    class Item < Sequel::Model
      many_to_one :category
      many_to_one :place
    end
  end
end
