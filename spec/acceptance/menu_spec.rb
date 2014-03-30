require 'spec_helper'

describe 'manage items' do

  let(:login_page) { LoginPage.new }
  let(:menu_page)  { MenuPage.new }
  let(:place)      { Place.make.save }

  it 'create new item' do
    category = place.add_category name: 'Carnes'
    login_page.authenticate
    menu_page.new_item(category.name, 'Feijão')
    html.must_include 'Feijão'
    category.items_dataset.count.must_equal 1
  end

  it 'delete an item' do
    category = place.add_category name: 'Carnes'
    login_page.authenticate
    menu_page.new_item category.name, 'Feijão'
    menu_page.delete_item category.name, 'Feijão'
    category.items_dataset.count.must_equal 0
  end

end
