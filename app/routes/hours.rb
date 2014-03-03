module Menu
  module Routes
    class Hours < Base
      put '/v1/place/hours/:id', auth: :place do
        json = json_params[:hour]
        hour = current_place.business_hours_dataset.find_or_new id: params[:id]
        hour.values[:place_id] = current_place.id
        hour.values[:id] = params[:id]
        json hour.update(json.except(:place_id, :id))
      end

      delete '/v1/place/hours/:id', auth: :place do
        current_place.business_hours_dataset.first!(id: params[:id]).destroy
        halt 204
      end
    end
  end
end
