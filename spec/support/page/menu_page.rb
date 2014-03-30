class MenuPage
  include Capybara::DSL

  def new_item(category, name)
    block = find('h4', text: category).parent
    block.find('.tt-input').set(name)
    block.find('.tt-input').native.send_keys(:return)
    block
  end

  def delete_item(category, name)
    block = find('h4', text: category).find(:xpath, '..')
    tr = block.find('td', text: name).find(:xpath, '..')
    tr.hover
    tr.find('span').click
  end
end
