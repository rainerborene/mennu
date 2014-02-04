module Menu
  module Models
    class Place < Sequel::Model
      plugin :secure_password
      pg_array_to_many :payment_methods, array_type: :uuid
      one_to_many :items
    end
  end
end
