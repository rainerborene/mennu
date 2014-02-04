Sequel.migration do
  change do
    run %{
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      CREATE EXTENSION IF NOT EXISTS "postgis";
    }

    create_table :users do
      column :id, :uuid, null: false, default: Sequel::LiteralString.new('uuid_generate_v4()')
      column :uid, :text, null: false
      column :name, :text
      column :email, :text, null: false
      column :slug, :text
      column :secret, :text
      column :token, :text
      column :created_at, 'timestamp without time zone'
      column :updated_at, 'timestamp without time zone'

      primary_key [:id]

      index [:uid], unique: true
      index [:slug], unique: true
    end

    create_table :places do
      column :id, :uuid, null: false, default: Sequel::LiteralString.new('uuid_generate_v4()')
      column :name, :text, null: false
      column :slug, :text, null: false
      column :email, :text, null: false
      column :password_digest, :text, null: false
      column :description, :text, null: false
      column :logo, :text, null: false
      column :facebook, :text
      column :foursquare, :text
      column :twitter, :text
      column :website, :text
      column :establishment_types, 'text[]'
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
      column :street, :text, null: false
      column :neighborhood, :text, null: false
      column :city, :text, null: false
      column :state, :text, null: false
      column :postal_code, :text, null: false
      column :geolocation, :geography
      column :phone, :text
      foreign_key :place_id, :users, type: :uuid, key: [:id]
      column :created_at, 'timestamp without time zone'
      column :updated_at, 'timestamp without time zone'

      primary_key [:id]
    end

    create_table :business_hours do
      column :id, :uuid, null: false, default: Sequel::LiteralString.new('uuid_generate_v4()')
      column :weekday, :integer, null: false
      column :interval, :int4range, null: false
      foreign_key :place_id, :users, type: :uuid, key: [:id]
      column :created_at, 'timestamp without time zone'
      column :updated_at, 'timestamp without time zone'

      primary_key [:id]

      index [:place_id]
    end

    create_table :payment_methods do
      column :id, :uuid, null: false, default: Sequel::LiteralString.new('uuid_generate_v4()')
      column :name, :text, null: false
      column :group, :integer

      primary_key [:id]
    end

    create_table :categories do
      column :id, :uuid, null: false, default: Sequel::LiteralString.new('uuid_generate_v4()')
      column :name, :text, null: false
      column :slug, :text, null: false

      primary_key [:id]

      index [:name], unique: true
    end

    create_table :items do
      column :id, :uuid, null: false, default: Sequel::LiteralString.new('uuid_generate_v4()')
      column :code, :integer
      column :name, :text, null: false
      column :slug, :text, null: false
      column :description, :text
      column :price, :float
      column :show_price, :boolean, default: true
      column :position, :integer
      foreign_key :place_id, :users, type: :uuid, key: [:id]
      foreign_key :category_id, :users, type: :uuid, key: [:id]
      column :self_service, :boolean, default: false
      column :created_at, 'timestamp without time zone'
      column :updated_at, 'timestamp without time zone'

      primary_key [:id]

      index [:place_id]
      index [:place_id, :category_id]
    end

    create_table :photos do
      column :id, :uuid, null: false, default: Sequel::LiteralString.new('uuid_generate_v4()')
      column :description, :text
      column :image, :text, null: false
      column :width, :integer, null: false
      column :height, :integer, null: false
      column :content_type, :text, null: false
      column :attachable_id, :uuid, null: false
      column :attachable_type, :text, null: false
      column :created_at, 'timestamp without time zone'
      column :updated_at, 'timestamp without time zone'

      primary_key [:id]
    end
  end
end
