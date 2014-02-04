Warden::Manager.before_failure do |env,opts|
  env['REQUEST_METHOD'] = 'POST'
end

Warden::Strategies.add(:admin) do
  def valid?
    params['email'] || params['password']
  end

  def authenticate!
    place = Place.first email: params['email']
    if place && place.authenticate(params['password'])
      success! place
    else
      fail! "Could not log in"
    end
  end
end
