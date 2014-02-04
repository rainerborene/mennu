module Menu
  module Models
    class BusinessHour < Sequel::Model
      many_to_one :place
    end
  end
end
