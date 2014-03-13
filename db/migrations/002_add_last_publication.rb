Sequel.migration do
  change do
    alter_table :places do
      add_column :last_publication, 'timestamp without time zone'
    end
  end
end
