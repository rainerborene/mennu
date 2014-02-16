require 'lib/sequel/polymorphic'

Sequel.default_timezone = :utc

Sequel.extension :core_extensions
Sequel.extension :pg_array
Sequel.extension :pg_array_ops

Sequel::Model.plugin :timestamps
Sequel::Model.plugin :validation_helpers
Sequel::Model.plugin :json_serializer
Sequel::Model.plugin :pg_array_associations
Sequel::Model.plugin :polymorphic
Sequel::Model.raise_on_save_failure = false

module Menu
  module Models
    autoload :User, 'app/models/user'
    autoload :Place, 'app/models/place'
    autoload :Address, 'app/models/address'
    autoload :BusinessHour, 'app/models/business_hour'
    autoload :Subscription, 'app/models/subscription'
    autoload :Category, 'app/models/category'
    autoload :Item, 'app/models/item'
  end
end
