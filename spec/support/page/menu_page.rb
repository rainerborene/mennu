class MenuPage < Test::Page
  def new_item(category, name)
    block = browser.h4(text: category).parent
    block.text_field(class: 'tt-input').set(name)
    block.text_field(class: 'tt-input').send_keys :return
    block
  end

  def delete_item(category, name)
  end
end
