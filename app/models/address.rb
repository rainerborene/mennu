module Menu
  module Models
    class Address < Sequel::Model
      one_to_one :place

      set_dataset dataset.select_append {
        st_astext(:geolocation).as(:geolocation)
      }

      def coordinates
        geolocation.scan(/[0-9\.-]+/).map(&:to_f)
      end

      def coordinates=(values)
        value = "ST_MakePoint(#{values.join ','})"
        self.geolocation = Sequel::LiteralString.new(value)
      end

      def as_json(options = nil)
        {
          id: id,
          street: street,
          street_number: street_number,
          neighborhood: neighborhood,
          city: city,
          state: state,
          postal_code: postal_code,
          coordinates: coordinates,
          phone: phone
        }
      end

      def validate
        super
        validates_presence [:street, :street_number, :neighborhood, :city,
                            :state, :postal_code, :geolocation, :phone]
      end
    end
  end
end
