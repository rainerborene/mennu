module Menu
  module Routes
    class Messages < Base
      post '/messages' do
        message = Message.new params[:message]
        if message.valid?
          message.deliver
          halt 200
        else
          json message.errors
        end
      end
    end
  end
end
