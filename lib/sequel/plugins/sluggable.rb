module Sequel
  module Plugins
    module Sluggable
      module ClassMethods
        def find_by_pk_or_slug!(value)
          uuid?(value) ? first!(id: value) : first!(slug: value.chomp)
        end

        def find_by_pk_or_slug(value)
          uuid?(value) ? first(id: value) : first(slug: value.chomp)
        end

        def uuid?(value)
          value.length == 36
        end
      end # ClassMethods
    end # Sluggable
  end # Plugins
end # Sequel
