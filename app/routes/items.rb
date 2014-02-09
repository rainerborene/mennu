module Menu
  module Routes
    class Items < Base
      get '/v1/places/:id/items' do
        place = Place.first! id: params[:id]
        json place.menu
      end

      get '/v1/places/:id/items/:timestamp' do
        time = Time.at params[:timestamp].to_i
        place = Place.first! id: params[:id]
        json place.menu(time)
      end

      post '/v1/items', auth: true do
        params = json_params[:item]
        menu = current_user.categories_dataset.find_or_create name: params[:category_name]
        json menu.add_item name: params[:name], place_id: current_user.id, self_service: true
      end

      delete '/v1/items/:id', auth: true do
        current_user.items_dataset.first!(id: params[:id]).destroy
        halt 204
      end
    end
  end
end
