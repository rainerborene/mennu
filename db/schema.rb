Sequel.migration do
  change do
    create_table(:spatial_ref_sys) do
      Integer :srid, :null=>false
      String :auth_name, :size=>256
      Integer :auth_srid
      String :srtext, :size=>2048
      String :proj4text, :size=>2048
      
      primary_key [:srid]
    end
  end
end
