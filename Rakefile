require_relative 'app'
require 'rake/sprocketstask'
require 'dotenv/tasks'

Rake::SprocketsTask.new do |t|
  t.environment = Menu::Routes::Base.assets
  t.output      = './public/assets'
  t.assets      = %w( application.js application.css )
end

namespace :db do
  desc 'Run DB migrations'
  task migrate: :dotenv do
    require 'sequel/extensions/migration'

    Sequel::Migrator.apply(Menu::App.database, 'db/migrations')
  end

  desc 'Rollback migration'
  task rollback: :dotenv do
    require 'sequel/extensions/migration'

    database = Menu::App.database
    version  = (row = database[:schema_info].first) ? row[:version] : nil
    Sequel::Migrator.apply(database, 'db/migrations', version - 1)
  end

  desc 'Drop the database'
  task drop: :dotenv do
    database = Menu::App.database

    database.tables.each do |table|
      next if table.eql? :spatial_ref_sys
      database.run("DROP TABLE #{table} CASCADE")
    end
  end

  desc 'Dump the database schema'
  task dump: :dotenv do
    database = Menu::App.database

    `sequel -d #{database.url} > db/schema.rb`
    `pg_dump --schema-only #{database.url} > db/schema.sql`
  end
end
