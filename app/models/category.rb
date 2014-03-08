module Menu
  module Models
    class Category < Sequel::Model
      one_to_many :places
      one_to_many :items

      dataset_module do
        def items_at(time)
          sql = model_object.items_dataset.select(:category_id).distinct.at(time).sql
          where("id in (#{sql})").eager items: -> (ds) { ds.at(time) }
        end
      end

      def as_json(options = nil)
        { id: id, name: name, items: items }
      end

      def before_validation
        self.slug = name.parameterize
      end

      def validate
        super
        validates_presence [:name, :place_id]
        validates_unique [:name, :place_id]
      end
    end
  end
end
