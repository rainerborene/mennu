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
        status 401
        json({ error: 'access denied' })
      end

      post '/login' do
        json authenticate
      end

      get '/logout' do
        session.destroy
        redirect '/'
      end
    end
  end
end
