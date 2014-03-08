require 'lib/sequel/polymorphic'

Sequel.default_timezone = :utc

Sequel.extension :core_extensions
Sequel.extension :pg_array
Sequel.extension :pg_array_ops

Sequel::Model.raise_on_save_failure = false

Sequel::Model.plugin :timestamps
Sequel::Model.plugin :update_or_create
Sequel::Model.plugin :validation_helpers
Sequel::Model.plugin :polymorphic

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
