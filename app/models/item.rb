module Menu
  module Models
    class Item < Sequel::Model
      many_to_one :category
      many_to_one :place

      dataset_module do
        def self_service
          where self_service: true
        end

        def at(time = Time.now)
          where("date(published_at - interval '3 hours') = ?", time.to_date).self_service
        end

        def recents
          now = Time.now.to_date
          dataset = where("date(published_at - interval '3 hours') >= ?", now)
          dataset = dataset.self_service.order(:published_at).limit(1)
          at dataset.select_map(:published_at).first
        end
      end

      def as_json(options = nil)
        { id: id, name: name }
      end

      def validate
        super
        validates_presence [:name, :category_id, :place_id]
      end
    end
  end
end
