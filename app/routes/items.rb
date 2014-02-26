module Menu
  module Routes
    class Items < Base
      get '/v1/places/:id/items' do
        place = Place.first! id: params[:id]
        json place.menu
      end

      get '/v1/places/:id/items/:timestamp', auth: :place do
        time = Time.at params[:timestamp].to_i
        place = Place.first! id: params[:id]
        json place.menu(time)
      end

      post '/v1/place/items', auth: :place do
        params = json_params[:item]
        category = current_place.categories_dataset.find_or_create name: params[:category_name]
        json current_place.add_item({
          name: params[:name],
          published_at: params[:published_at],
          category_id: category.id,
          self_service: true
        })
      end

      delete '/v1/place/items/:id', auth: :place do
        current_place.items_dataset.first!(id: params[:id]).destroy
        halt 204
      end
    end
  end
end
