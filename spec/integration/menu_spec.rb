require 'watir_helper'

describe 'manage items', :js do

  let(:login_page) { LoginPage.new }
  let(:menu_page) { MenuPage.new }
  let(:place) { Place.first }

  it 'create new item' do
    login_page.login_with('couveflor@menu.com.br', 'dsa')

    category = place.categories.first
    category_count = category.items_dataset.count

    menu_page.new_item(category.name, 'Feijão').html.must_include 'Feijão'

    category.items_dataset.count.must_equal category_count + 1
  end

  it 'delete an item' do
    category = place.categories.first
    category.items_dataset.destroy

    login_page.login_with('couveflor@menu.com.br', 'dsa')

    menu_page.new_item(category.name, 'Feijão')
    menu_page.delete_item(category.name, 'Feijão')

    category.items_dataset.count.must_equal 0
  end

end
