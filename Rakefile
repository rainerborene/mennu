require 'bundler/setup'
require 'rake/testtask'
require 'rake/sprocketstask'

task default: [:test]

task :environment do
  require_relative 'app'
end

Rake::TestTask.new do |t|
  t.ruby_opts = ['-Ispec']
  t.pattern = "spec/**/*_spec.rb"
end

Rake::SprocketsTask.new do |t|
  t.output      = './public/assets'
  t.assets      = %w( libs.js application.js application.css site.css )
  t.assets     += %w( *.png *.jpg *.jpeg *.gif Flat-UI-Icons* )
  t.environment = proc do
    require_relative 'app'
    Menu::Routes::Base.assets
  end
end

namespace :assets do
  desc "Compile assets"
  task :precompile do
    Rake::Task['assets'].invoke
  end
end

namespace :db do
  desc 'Run DB migrations'
  task migrate: :environment do
    require 'sequel/extensions/migration'

    Sequel::Migrator.apply(Menu::App.database, 'db/migrations')
  end

  desc 'Rollback migration'
  task rollback: :environment do
    require 'sequel/extensions/migration'

    database = Menu::App.database
    version  = (row = database[:schema_info].first) ? row[:version] : nil
    Sequel::Migrator.apply(database, 'db/migrations', version - 1)
  end

  desc 'Drop the database'
  task drop: :environment do
    database = Menu::App.database

    database.tables.each do |table|
      next if table.eql? :spatial_ref_sys
      database.run("DROP TABLE #{table} CASCADE")
    end
  end

  desc 'Seed database'
  task seed: :environment do
    require './db/seeds'
  end

  desc 'Dump the database schema'
  task dump: :environment do
    database = Menu::App.database

    `sequel -d #{database.url} > db/schema.rb`
    `pg_dump --schema-only #{database.url} > db/schema.sql`
  end
end

Dir[File.dirname(__FILE__) + "/lib/tasks/*.rb"].sort.each do |path|
  require path
end
