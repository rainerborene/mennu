module Menu
  module Models
    class Address < Sequel::Model
      one_to_one :place

      set_dataset dataset.select_append {st_astext(:geolocation).as(:geolocation)}

      def coordinates
        geolocation.scan(/[0-9\.-]+/).map(&:to_f)
      end

      def to_json(options = {})
        super({
          except: [:created_at, :updated_at, :place_id, :geolocation],
          include: :coordinates
        }.merge(options))
      end

      def validate
        super
        validates_presence [:street, :street_number, :neighborhood, :city,
                            :state, :postal_code, :geolocation, :phone]
      end
    end
  end
end
