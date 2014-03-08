require 'multi_json'
require 'faraday'

module Google
  class ZeroResults < Exception
  end

  class Address
    attr_reader :city
    attr_reader :neighborhood
    attr_reader :postal_code
    attr_reader :state
    attr_reader :street
    attr_reader :street_number

    def initialize(response)
      @response = response || {}
      if @response.empty? or @response['status'] == 'ZERO_RESULTS'
        raise ZeroResults.new
      end

      @city          = capture 'locality'
      @neighborhood  = capture 'neighborhood'
      @postal_code   = capture 'postal_code'
      @state         = capture 'administrative_area_level_1'
      @street        = capture 'route'
      @street_number = capture 'street_number'
    end

    def coordinates
      @response['geometry']['location'].values
    end

    def as_json(options = nil)
      {
        city: city,
        neighborhood: neighborhood,
        postal_code: postal_code,
        state: state,
        street: street,
        street_number: street_number,
        coordinates: coordinates
      }
    end

    private

    def components
      @response['address_components']
    end

    def capture(type)
      item = components.detect {|n| n['types'].include? type }
      item['short_name'] unless item.nil?
    end
  end

  class Geocode
    def self.locate(address)
      endpoint = 'http://maps.google.com/maps/api/geocode/json'
      response = Faraday.get(endpoint, sensor: false, address: address)
      json = MultiJson.load(response.body)
      Address.new json['results'].first
    end
  end
end
