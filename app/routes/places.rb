module Menu
  module Routes
    class Places < Base
      put '/v1/place', auth: :place do
        current_place.set params[:place]
        json current_place.save
      end

      put '/v1/place/address', auth: :place do
        address = Address.find_or_new place_id: current_place.id
        address.set json_params[:address].except :id, :place_id
        json address.save
      end
    end
  end
end
