require_relative '../autocomplete'

namespace :redis do
  desc "Populate Redis database with food names"
  task :populate do
    path = ENV.fetch 'AC_PATH', File.expand_path('../../db/items.txt', __dir__)
    File.new(path).each_line do |line|
      Autocomplete.redis.sadd 'items', line.gsub("\n", "")
    end
  end
end
