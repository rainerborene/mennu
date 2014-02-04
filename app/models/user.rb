module Menu
  module Models
    class User < Sequel::Model
      def self.from_auth!(auth)
        auth           = auth.with_indifferent_access
        user           = first(uid: auth[:uid]) || self.new
        user.uid       = auth[:uid]
        user.name    ||= auth[:info][:name]
        user.email   ||= auth[:info][:email]
        user.slug    ||= auth[:info][:nickname]
        user.secret  ||= auth[:credentials][:secret]
        user.token   ||= auth[:credentials][:token]
        user.save
        user
      end
    end
  end
end
