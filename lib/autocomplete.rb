require 'redis'

module Autocomplete extend self
  def items
    redis.smembers :items
  end

  def seed
    File.new(path).each_line do |line|
      redis.sadd 'items', line.gsub("\n", "")
    end
  end

  def path
    ENV.fetch 'AC_PATH', File.expand_path('../db/items.txt', __dir__)
  end

  def redis
    @redis ||= Redis.current
  end

  attr_writer :redis
end
