require 'lib/pagarme'

module Menu
  module Models
    class Subscription < Sequel::Model
      many_to_one :place

      def transactions
        PagarMe.transactions(uid)
      end

      def self.charge!(params)
        json = PagarMe.charge params.except(:place_id)

        create({
          uid: json['id'],
          status: json['status'],
          card_brand: json['card_brand'],
          card_last_digits: json['card_last_digits'],
          date_created: json['date_created'],
          place_id: params[:place_id]
        })
      end
    end
  end
end
