//= require jquery
//= require jquery.bootstrap
//= require jquery.easing
//= require jquery.ketchup
//= require jquery.popupoverlay
//= require nicescroll
//= require_self

$(function(){

  $('.scrollto, .gototop').bind('click',function(event){
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top
    }, 1500,'easeInOutExpo');
    event.preventDefault();
  });

  $('#subscribeForm').ketchup().submit(function() {
    if ( $(this).ketchup('isValid') ){
      $.ajax({
        type: 'POST',
        url: $(this).attr('action'),
        data: $(this).serialize(),
        beforeSend: function(){
          $('#result').html('Aguarde alguns segundos.');
        },
        success: function(){
          $('#result').removeClass('erro');
          $('#result').html('Enviado com sucesso. <br />Em breve entraremos em contato com você.');
          setTimeout(function(){
            $('#basic').popup('hide');
            $('#subscribeForm').get(0).reset();
          }, 4000);
        },
        error: function() {
          $('#result').html('Desculpe, ocorreu um erro');
          $('#result').addClass('erro');
        }
      });
    }

    return false;
  });

  $('.btn-solicitar').on('click',function(){
    $('#basic').popup('show');
  });

});
