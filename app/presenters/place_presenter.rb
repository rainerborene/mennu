require 'uri'

module Menu
  module Presenters
    class PlacePresenter < SimpleDelegator
      delegate :address, to: :@place

      def initialize(context, model)
        @place = model
        super(context)
      end

      def link_to_instagram
        return unless @place.instagram.present?
        link_to "http://instagram.com/#{@place.instagram}", 'Instagram',
          target: '_blank', class: 'instagram-icon'
      end

      def link_to_maps
        return unless @place.address.present?
        query = [address.street, address.street_number, address.neighborhood]
        path = "https://www.google.com/maps/preview?q=#{URI.escape query.join(', ')}"
        link_to path, 'Google Maps', target: '_blank', class: 'maps-icon'
      end

      def link_to_facebook
        return unless @place.facebook.present?
        link_to @place.facebook, 'Facebook', target: '_blank',
          class: 'facebook-icon'
      end
    end
  end
end
