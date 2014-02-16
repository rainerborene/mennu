module Menu
  module Models
    class Item < Sequel::Model
      many_to_one :category
      many_to_one :place

      dataset_module do
        def at(time = Time.now)
          where('date(published_at) = ? and self_service = true', time.utc.to_date)
        end
      end

      def self.names
        distinct(:name).select_map(:name)
      end

      def to_json(options = {})
        super({ only: [:id, :name] }.merge(options))
      end

      def validate
        super
        validates_presence [:name, :category_id, :place_id]
      end
    end
  end
end
