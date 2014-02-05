module CarteAssociationMethods
  def eager_category
    eager_graph category: -> (dataset) do
      dataset.select(:id, :name).where place_id: model_object.id
    end
  end
end
