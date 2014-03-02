require 'redis'

module Sprockets
  module Cache
    class RedisStore
      def initialize(key_prefix = 'sprockets')
        @redis = Redis.new
        @key_prefix = key_prefix
      end

      # Lookup value in cache
      def [](key)
        data = @redis.get path_for(key)
        Marshal.load data if data
      end

      # Save value to cache
      def []=(key, value)
        @redis.set path_for(key), Marshal.dump(value)
        value
      end

      private

      def path_for(key)
        "#{@key_prefix}:#{key}"
      end
    end
  end
end
