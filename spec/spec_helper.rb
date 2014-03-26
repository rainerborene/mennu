ENV['RACK_ENV'] = 'test'
require File.expand_path '../app', __dir__
require 'minitest/autorun'
require 'minispec-metadata'
require 'carrierwave/test/matchers'
require 'rack/test'
require 'machinist'
require 'vcr'
require_relative 'blueprints'

Sequel::Model.extend Machinist::Machinable

CarrierWave.configure do |config|
  config.storage = :file
  config.enable_processing = false
end

VCR.configure do |c|
  c.cassette_library_dir = 'spec/cassettes'
  c.hook_into :fakeweb
end

class MiniTest::Spec
  include Rack::Test::Methods
  include CarrierWave::Test::Matchers

  alias_method :_original_run, :run

  def run(*args, &block)
    result = nil
    Sequel::Model.db.transaction(rollback: :always) do
      result = _original_run(*args, &block)
    end
    result
  end

  def app
    Menu::App
  end

  before do
    VCR.insert_cassette name if metadata[:vcr]
  end

  after do
    VCR.eject_cassette if metadata[:vcr]
  end
end
