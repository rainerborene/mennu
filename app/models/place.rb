module Menu
  module Models
    class Place < Sequel::Model
      plugin :secure_password
      plugin :sluggable

      one_to_many :items
      one_to_many :categories, extend: ::FindMethods
      one_to_many :business_hours
      one_to_one :address

      set_allowed_columns :name, :password, :password_confirmation, :slug,
        :email, :description, :logo, :website, :establishment_types,
        :opened_to_public, :last_publication

      mount_uploader :logo, LogoUploader

      delegate :menu, to: :categories_dataset

      alias_method :hours, :business_hours

      def as_json(options = nil)
        {
          id: id,
          name: name,
          slug: slug,
          email: email,
          description: description,
          logo: logo,
          website: website,
          establishment_types: establishment_types,
          opened_to_public: opened_to_public
        }
      end

      def validate
        super
        validates_unique :slug
      end
    end
  end
end
