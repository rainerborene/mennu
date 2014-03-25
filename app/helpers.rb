module Menu
  module Helpers
    def l(*args)
      I18n.l(*args)
    end

    def link_to(url, text = url, opts = {})
      attributes = ""
      opts.each { |key,value| attributes << key.to_s << "=\"" << value << "\" "}
      "<a href=\"#{url}\" #{attributes.strip}>#{text}</a>"
    end
  end
end
