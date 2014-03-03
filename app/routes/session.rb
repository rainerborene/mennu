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

      get '/logout' do
        logout :user
        redirect '/'
      end

      post '/admin/login' do
        json authenticate(:place, scope: :place)
      end

      get '/admin/logout' do
        logout :place
        redirect '/'
      end
    end
  end
end
