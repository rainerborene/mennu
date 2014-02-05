module Menu
  module Routes
    class Session < Base
      get '/auth/:platform/callback' do
        self.current_user = User.from_auth!(env['omniauth.auth'])
        erb :authorized
      end

      get '/auth/failure' do
        session.destroy
        halt 422, 'Auth failure'
      end

      post '/unauthenticated' do
        content_type :json
        status 401
        { error: 'access denied' }.to_json
      end

      post '/login' do
        content_type :json
        place = authenticate
        place.to_json
      end

      get '/logout' do
        session.destroy
        redirect '/'
      end
    end
  end
end
