ENV['RACK_ENV'] = 'test'
require File.expand_path '../app', __dir__
require 'minitest/autorun'
require 'minispec-metadata'
require 'database_cleaner'
require 'capybara'
require 'capybara/dsl'
require 'mock_redis'
require_relative 'blueprints'

Dir['spec/support/*/*'].each {|f| require f }

DatabaseCleaner.strategy = :truncation

Redis.current = MockRedis.new

Capybara.configure do |config|
  config.app = Menu::App
  config.run_server = true
  config.current_driver = :selenium
end

CarrierWave.configure do |config|
  config.root = Menu::App.public_folder
  config.storage = :file
  config.enable_processing = false
  config.ensure_multipart_form = false
end

class MiniTest::Spec
  include Capybara::DSL

  def app
    Menu::App
  end

  def wait_for_ajax
    Timeout.timeout(Capybara.default_wait_time) do
      active = page.evaluate_script('jQuery.active')
      until active == 0
        active = page.evaluate_script('jQuery.active')
      end
    end
  end

  before :each do
    DatabaseCleaner.start
  end

  after :each do
    DatabaseCleaner.clean
    Capybara.reset_sessions!
  end
end
