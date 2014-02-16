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
      column :website, :citext
      column :establishment_types, 'citext[]'
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

      index [:place_id]
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

    create_table :subscriptions do
      column :id, :uuid, null: false, default: Sequel::LiteralString.new('uuid_generate_v4()')
      column :uid, :integer, null: false
      column :status, :citext, null: false
      column :card_brand, :citext, null: false
      column :card_last_digits, :integer, null: false
      column :date_created, 'timestamp without time zone'
      foreign_key :place_id, :places, type: :uuid, key: [:id]

      primary_key [:id]

      index [:place_id]
    end

    create_table :categories do
      column :id, :uuid, null: false, default: Sequel::LiteralString.new('uuid_generate_v4()')
      column :name, :citext, null: false
      column :slug, :citext, null: false
      foreign_key :place_id, :places, type: :uuid, key: [:id]

      primary_key [:id]

      index [:place_id]
    end

    create_table :items do
      column :id, :uuid, null: false, default: Sequel::LiteralString.new('uuid_generate_v4()')
      column :name, :citext, null: false
      column :description, :citext
      column :show_price, :boolean, default: true
      column :price, :float
      column :code, :integer
      column :position, :integer
      column :self_service, :boolean, default: false
      foreign_key :category_id, :categories, type: :uuid, key: [:id]
      foreign_key :place_id, :places, type: :uuid, key: [:id]
      column :published_at, 'timestamp without time zone'
      column :created_at, 'timestamp without time zone'
      column :updated_at, 'timestamp without time zone'

      primary_key [:id]

      index [:category_id]
      index [:place_id]
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

      index [:attachable_id, :attachable_type]
    end
  end
end
