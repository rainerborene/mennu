require File.expand_path '../app', __dir__
require 'minitest/autorun'
require 'minispec-metadata'
require 'watir'
require 'test/page'

Dir['spec/support/*/*'].each {|f| require f }

class MiniTest::Spec
  let(:browser) do
    Watir::Browser.new if metadata[:js]
  end

  before do
    Test::Page.browser = browser if metadata[:js]
  end

  after do
    browser.close if metadata[:js]
  end
end
