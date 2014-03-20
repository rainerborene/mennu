Sequel.migration do
  change do
    alter_table :categories do
      add_column :position, :integer
    end
  end
end
