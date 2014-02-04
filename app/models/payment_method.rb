module Menu
  module Models
    class PaymentMethod < Sequel::Model
      many_to_pg_array :places, array_type: :uuid
    end
  end
end
