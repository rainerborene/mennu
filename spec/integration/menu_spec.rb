require 'watir_helper'

describe 'manage items', :js do

  let(:login_page) { LoginPage.new }
  let(:menu_page) { MenuPage.new }
  let(:place) { Place.first }

  before do
    login_page.login_with('couveflor@menu.com.br', 'dsa')
  end

  it 'create new item' do
    category = place.categories.first
    category_count = category.items_dataset.count

    block = menu_page.new_item(category.name, 'Feijão')
    block.html.must_include 'Feijão'

    category.items_dataset.count.must_equal category_count + 1
  end

end
