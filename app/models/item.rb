module Menu
  module Models
    class Item < Sequel::Model
      many_to_one :category

      dataset_module do
        def at(time = Time.now)
          where('date(published_at) = ? and self_service = true', time.utc.to_date)
        end
      end

      def self.names
        distinct(:name).select_map(:name)
      end

      def before_validation
        self.slug = name.parameterize
      end

      def validate
        super
        validates_presence [:name, :category_id]
      end

      def to_json(options = {})
        super({ only: [:id, :name] }.merge(options))
      end
    end
  end
end
