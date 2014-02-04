module Menu
  module Models
    class Address < Sequel::Model
      many_to_one :place
    end
  end
end
