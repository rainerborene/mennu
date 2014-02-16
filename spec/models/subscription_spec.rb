require 'spec_helper'

describe Subscription do

  let(:place) { Place.make.save }
  let(:subscription) do
    Subscription.charge!({
      card_number: '4901720080344448',
      card_holder_name: 'Jose da Silva',
      card_expiration_date: '1215',
      card_cvv: '314',
      plan_id: 2929,
      place_id: place.id,
      customer: { email: place.email }
    })
  end

  describe '.charge!', :vcr do
    it 'should subscribe customer to a plan' do
      subscription.exists?.must_equal true
      subscription.card_last_digits.must_equal 4448
      subscription.card_brand.must_equal 'visa'
      subscription.place_id.must_equal place.id
    end
  end

  describe '#transactions', :vcr do
    it 'should return all transactions' do
      subscription.transactions.must_be_empty
    end
  end

end
