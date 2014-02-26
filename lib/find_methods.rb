module FindMethods
  def find_or_create(vals)
    first(vals) || model.create(vals.merge(association_reflection[:key]=>model_object.id))
  end

  def find_or_initialize(vals)
    first(vals) || model.new.set_all(vals.merge(association_reflection[:key]=>model_object.id))
  end
end
