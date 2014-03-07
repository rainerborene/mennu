require 'bundler/setup'
require 'autocomplete'
require 'minitest/autorun'
require 'mock_redis'

describe Autocomplete do

  before(:all) do
    Autocomplete.redis = MockRedis.new
    Autocomplete.seed
  end

  describe '.items' do
    it 'should return unique array of items' do
      items = Autocomplete.items
      items.length.must_equal 1734
      items.must_be_kind_of Array
      items.wont_be_empty
    end
  end

end
