require 'bundler/setup'
require 'google/geocode'
require 'minitest/autorun'

describe Google::Geocode do

  let(:address) do
    Google::Geocode.locate('Rua Salomão Rodrigues da Silva')
  end

  describe '.locate' do
    it 'should geocode given address' do
      address.street.must_equal 'Rua Salomão Rodrigues da Silva'
      address.postal_code.must_equal '31330-490'
      address.neighborhood.must_equal 'Jardim Paquetá'
      address.state.must_equal 'MG'
      address.coordinates.must_include(-19.8723819)
      address.coordinates.must_include(-43.99300890000001)
    end
  end

end
