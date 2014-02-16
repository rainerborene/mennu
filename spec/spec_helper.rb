ENV['RACK_ENV'] = 'test'
require File.expand_path '../app', __dir__
require 'minitest/autorun'
require 'minispec-metadata'
require 'rack/test'
require 'machinist'
require 'vcr'

Sequel::Model.extend Machinist::Machinable

require_relative 'blueprints'

VCR.configure do |c|
  c.cassette_library_dir = 'spec/cassettes'
  c.hook_into :fakeweb
end

class MiniTest::Spec
  include Rack::Test::Methods

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
