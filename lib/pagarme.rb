require 'httparty'

class PagarMe
  include HTTParty
  base_uri 'https://api.pagar.me/1'
  default_params api_key: ENV['PAGARME_API_KEY']

  def self.charge(params={})
    post '/subscriptions', body: params
  end

  def self.cancel(id)
    post "/subscriptions/#{id}/cancel"
  end

  def self.transactions(id)
    get "/subscriptions/#{id}/transactions"
  end
end
