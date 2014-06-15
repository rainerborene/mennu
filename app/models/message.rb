require 'active_model'
require 'dedent'

module Menu
  module Models
    class Message
      include ActiveModel::Model

      attr_accessor :establishment, :name, :phone, :email

      validates_presence_of :establishment, :name, :phone, :email
      validates_format_of :email, with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i

      def deliver
        message = <<-EOF.dedent
          Nome: #{name}
          Restaurante: #{establishment}
          Telefone: #{phone}
          E-mail: #{email}
        EOF

        Mail.deliver do
          from 'Mennu <cardapio@mennu.com.br>'
          to 'cardapio@mennu.com.br'
          subject 'Mensagem enviada pelo formulário do Mennu'
          cc 'Eduardo Mota <eduardo@movidacomunica.com.br>'
          cc << 'Rainer Borene <rainerborene@gmail.com>'
          body message
        end
      end
    end
  end
end
