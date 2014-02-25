module Menu
  module Models
    class Item < Sequel::Model
      many_to_one :category
      many_to_one :place

      dataset_module do
        def selfservice
          where self_service: true
        end

        def at(time = Time.now)
          where("date(published_at - interval '3 hours') = ?", time.to_date).selfservice
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
