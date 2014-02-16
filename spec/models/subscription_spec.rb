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
      assert subscription.exists?
      assert_equal subscription.card_last_digits, 4448
      assert_equal subscription.card_brand, 'visa'
      assert_equal place.id, subscription.place_id
    end
  end

  describe '#transactions', :vcr do
    it 'should return all transactions' do
      assert_empty subscription.transactions
    end
  end

end
