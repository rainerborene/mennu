module FindOrCreate
  def find_or_create(vals)
    first(vals) || model.create(vals.merge(association_reflection[:key]=>model_object.id))
  end
end
