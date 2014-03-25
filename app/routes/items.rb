require 'sinatra/respond_with'

module Menu
  module Routes
    class Items < Base
      register Sinatra::RespondWith

      get '/v1/places/:id/items' do
        @place = Place.find_by_pk_or_slug! params[:id]
        @categories = @place.menu(@place.last_publication).order(:position).all
        respond_to do |format|
          format.xml  { nokogiri :items }
          format.json { @categories.to_json }
        end
      end

      get '/v1/places/:id/items/:timestamp', auth: :place do
        time = Time.at params[:timestamp].to_i
        place = Place.first! id: params[:id]
        json place.menu(time).all
      end

      post '/v1/place/items', auth: :place do
        attrs = json_params[:item]
        category = current_place.categories_dataset.find_or_create name: attrs[:category_name]

        now = Time.now
        published_at = Time.parse attrs[:published_at]
        published_at = published_at.change hour: now.hour, min: now.min, sec: now.sec

        json current_place.add_item({
          name: attrs[:name],
          published_at: published_at,
          category_id: category.id,
          self_service: true
        })
      end

      delete '/v1/place/items/:id', auth: :place do
        current_place.items_dataset.first!(id: params[:id]).destroy
        halt 204
      end

      put '/v1/categories/sorting', auth: :place do
        ids = json_params[:category_ids]
        categories = current_place.categories_dataset.where(id: ids).all
        ids.each_with_index do |id, idx|
          categories.find {|c| c.id == id }.update position: idx + 1
        end
        halt 200
      end
    end
  end
end
