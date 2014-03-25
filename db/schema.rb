Sequel.migration do
  change do
    create_table(:photos, :ignore_index_errors=>true) do
      String :id, :null=>false
      String :description
      String :image, :null=>false
      Integer :width, :null=>false
      Integer :height, :null=>false
      String :content_type, :null=>false
      String :attachable_id, :null=>false
      String :attachable_type, :null=>false
      DateTime :created_at
      DateTime :updated_at
      
      primary_key [:id]
      
      index [:attachable_id, :attachable_type]
    end
    
    create_table(:places, :ignore_index_errors=>true) do
      String :id, :null=>false
      String :name, :null=>false
      String :slug, :null=>false
      String :email, :null=>false
      String :password_digest, :null=>false
      String :description, :null=>false
      String :logo
      String :website
      String :establishment_types
      TrueClass :opened_to_public, :default=>true
      DateTime :expire_at
      DateTime :created_at
      DateTime :updated_at
      DateTime :last_publication
      String :facebook
      String :instagram
      
      primary_key [:id]
      
      index [:email], :unique=>true
      index [:slug], :unique=>true
    end
    
    create_table(:schema_info) do
      Integer :version, :default=>0, :null=>false
    end
    
    create_table(:spatial_ref_sys) do
      Integer :srid, :null=>false
      String :auth_name, :size=>256
      Integer :auth_srid
      String :srtext, :size=>2048
      String :proj4text, :size=>2048
      
      primary_key [:srid]
    end
    
    create_table(:users, :ignore_index_errors=>true) do
      String :id, :null=>false
      String :uid, :null=>false
      String :name
      String :email, :null=>false
      String :slug
      String :secret
      String :token
      DateTime :created_at
      DateTime :updated_at
      
      primary_key [:id]
      
      index [:slug], :unique=>true
      index [:uid], :unique=>true
    end
    
    create_table(:addresses, :ignore_index_errors=>true) do
      String :id, :null=>false
      String :street, :null=>false
      String :street_number, :null=>false
      String :neighborhood, :null=>false
      String :city, :null=>false
      String :state, :null=>false
      String :postal_code, :null=>false
      String :geolocation, :null=>false
      String :phone, :null=>false
      foreign_key :place_id, :places, :type=>String, :key=>[:id]
      DateTime :created_at
      DateTime :updated_at
      
      primary_key [:id]
      
      index [:place_id]
    end
    
    create_table(:business_hours, :ignore_index_errors=>true) do
      String :id, :null=>false
      Integer :weekday, :null=>false
      Time :start_time, :only_time=>true, :null=>false
      String :end_time, :null=>false
      foreign_key :place_id, :places, :type=>String, :key=>[:id]
      DateTime :created_at
      DateTime :updated_at
      
      primary_key [:id]
      
      index [:place_id]
    end
    
    create_table(:categories, :ignore_index_errors=>true) do
      String :id, :null=>false
      String :name, :null=>false
      String :slug, :null=>false
      foreign_key :place_id, :places, :type=>String, :key=>[:id]
      Integer :position
      
      primary_key [:id]
      
      index [:place_id]
    end
    
    create_table(:items, :ignore_index_errors=>true) do
      String :id, :null=>false
      String :name, :null=>false
      String :description
      TrueClass :show_price, :default=>true
      Float :price
      Integer :code
      Integer :position
      TrueClass :self_service, :default=>false
      foreign_key :category_id, :categories, :type=>String, :key=>[:id]
      foreign_key :place_id, :places, :type=>String, :key=>[:id]
      DateTime :published_at
      DateTime :created_at
      DateTime :updated_at
      
      primary_key [:id]
      
      index [:category_id]
      index [:place_id]
    end
  end
end
