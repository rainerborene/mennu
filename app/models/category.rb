module Menu
  module Models
    class Category < Sequel::Model
      one_to_many :places
      one_to_many :items

      dataset_module do
        def menu(time = Time.now)
          relation = eager items: -> (ds) { ds.at(time) }
          if time.to_date < Date.today
            sql = model_object.items_dataset.select(:category_id).distinct.at(time).sql
            relation = relation.where("id in (#{sql})")
          end
          relation
        end
      end

      def as_json(options = nil)
        {
          id: id,
          name: name,
          position: position,
          items: items
        }
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
