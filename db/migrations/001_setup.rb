Sequel.migration do
  change do
    run %{
      CREATE EXTENSION IF NOT EXISTS "citext";
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      CREATE EXTENSION IF NOT EXISTS "postgis";
    }

    create_table :users do
      column :id, :uuid, null: false, default: Sequel::LiteralString.new('uuid_generate_v4()')
      column :uid, :citext, null: false
      column :name, :citext
      column :email, :citext, null: false
      column :slug, :citext
      column :secret, :citext
      column :token, :citext
      column :created_at, 'timestamp without time zone'
      column :updated_at, 'timestamp without time zone'

      primary_key [:id]

      index [:uid], unique: true
      index [:slug], unique: true
    end

    create_table :places do
      column :id, :uuid, null: false, default: Sequel::LiteralString.new('uuid_generate_v4()')
      column :name, :citext, null: false
      column :slug, :citext, null: false
      column :email, :citext, null: false
      column :password_digest, :citext, null: false
      column :description, :citext, null: false
      column :logo, :citext, null: false
      column :facebook, :citext
      column :foursquare, :citext
      column :twitter, :citext
      column :website, :citext
      column :establishment_types, 'citext[]'
      column :payment_method_ids, 'uuid[]'
      column :opened_to_public, :boolean, default: true
      column :expire_at, 'timestamp without time zone'
      column :created_at, 'timestamp without time zone'
      column :updated_at, 'timestamp without time zone'

      primary_key [:id]

      index [:slug], unique: true
      index [:email], unique: true
    end

    create_table :addresses do
      column :id, :uuid, null: false, default: Sequel::LiteralString.new('uuid_generate_v4()')
      column :street, :citext, null: false
      column :neighborhood, :citext, null: false
      column :city, :citext, null: false
      column :state, :citext, null: false
      column :postal_code, :citext, null: false
      column :geolocation, :geography
      column :phone, :citext
      foreign_key :place_id, :places, type: :uuid, key: [:id]
      column :created_at, 'timestamp without time zone'
      column :updated_at, 'timestamp without time zone'

      primary_key [:id]
    end

    create_table :business_hours do
      column :id, :uuid, null: false, default: Sequel::LiteralString.new('uuid_generate_v4()')
      column :weekday, :integer, null: false
      column :interval, :int4range, null: false
      foreign_key :place_id, :places, type: :uuid, key: [:id]
      column :created_at, 'timestamp without time zone'
      column :updated_at, 'timestamp without time zone'

      primary_key [:id]

      index [:place_id]
    end

    create_table :payment_methods do
      column :id, :uuid, null: false, default: Sequel::LiteralString.new('uuid_generate_v4()')
      column :name, :citext, null: false
      column :group, :integer

      primary_key [:id]
    end

    create_table :categories do
      column :id, :uuid, null: false, default: Sequel::LiteralString.new('uuid_generate_v4()')
      column :name, :citext, null: false
      column :slug, :citext, null: false
      foreign_key :place_id, :places, type: :uuid, key: [:id]

      primary_key [:id]

      index [:place_id, :slug], unique: true
    end

    create_table :items do
      column :id, :uuid, null: false, default: Sequel::LiteralString.new('uuid_generate_v4()')
      column :code, :integer
      column :name, :citext, null: false
      column :slug, :citext, null: false
      column :description, :citext
      column :price, :float
      column :show_price, :boolean, default: true
      column :position, :integer
      foreign_key :place_id, :places, type: :uuid, key: [:id]
      foreign_key :category_id, :categories, type: :uuid, key: [:id]
      column :self_service, :boolean, default: false
      column :created_at, 'timestamp without time zone'
      column :updated_at, 'timestamp without time zone'

      primary_key [:id]

      index [:place_id, :category_id]
    end

    create_table :photos do
      column :id, :uuid, null: false, default: Sequel::LiteralString.new('uuid_generate_v4()')
      column :description, :citext
      column :image, :citext, null: false
      column :width, :integer, null: false
      column :height, :integer, null: false
      column :content_type, :citext, null: false
      column :attachable_id, :uuid, null: false
      column :attachable_type, :citext, null: false
      column :created_at, 'timestamp without time zone'
      column :updated_at, 'timestamp without time zone'

      primary_key [:id]
    end
  end
end
