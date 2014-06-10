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
          Olá,

          #{name} do #{establishment} está interessado em conhecer o Mennu.
          
          Entre em contato pelo telefone #{phone} ou e-mail #{email}.

          Este e-mail foi enviado através do formulário de contato do Mennu.

          Obrigado,
          Admin
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
