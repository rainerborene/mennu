module Sequel
  module Plugins
    module Sluggable
      module ClassMethods
        def find_by_pk_or_slug!(value)
          value.length == 36 ? first!(id: value) : self.find_by_slug!(value)
        end

        def find_by_slug!(value)
          first! slug: value.chomp
        end
      end # ClassMethods
    end # Sluggable
  end # Plugins
end # Sequel
