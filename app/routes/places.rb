module Menu
  module Routes
    class Places < Base
      # Merging because we're dealing with both type of requests
      before do
        params.merge! json_params if json_params.is_a? Hash
      end

      put '/v1/place', auth: :place do
        current_place.set params[:place].except :id
        json current_place.save
      end

      put '/v1/place/address', auth: :place do
        address = Address.find_or_new place_id: current_place.id
        address.set params[:address].except :id, :place_id
        json address.save
      end
    end
  end
end
