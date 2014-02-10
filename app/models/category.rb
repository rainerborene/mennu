require 'pry-meta'

module Menu
  module Models
    class Category < Sequel::Model
      one_to_many :places
      one_to_many :items

      dataset_module do
        def items_published_at(time)
          sql = model_object.items_dataset.select(:category_id).distinct.at(time).sql
          where("id in (#{sql})").eager items: -> (ds) { ds.at(time) }
        end
      end

      def to_json(options={})
        super({ only: [:id, :name], include: :items }.merge(options))
      end

      def before_validation
        self.slug = name.parameterize
      end

      def validate
        super
        validates_presence [:name, :place_id]
      end
    end
  end
end
