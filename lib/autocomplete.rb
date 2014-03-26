require 'redis'

module Autocomplete extend self
  def items
    redis.smembers :items
  end

  def redis
    @redis ||= Redis.current
  end

  attr_writer :redis
end
