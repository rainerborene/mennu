Sequel.migration do
  change do
    alter_table :places do
      add_column :facebook, :citext
      add_column :instagram, :citext
    end
  end
end
