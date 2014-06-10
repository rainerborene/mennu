//= require jquery
//= require jquery.bootstrap
//= require jquery.easing
//= require jquery.ketchup
//= require jquery.popupoverlay
//= require typer
//= require nicescroll
//= require pace
//= require_self

$(function(){

  $('[data-typer-targets]').typer();

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
        success: function(data){
          $('#result').removeClass('erro');
          $('#result').html(data);
        },
        error: function() {
          $('#result').html('Desculpe, ocorreu um erro');
          $('#result').addClass('erro');
        }
      });
      setTimeout(function(){
        $('#result').html('');
      },9000);
    }

    return false;
  });

  $('.btn-solicitar').on('click',function(){
    $('#basic').popup('show');
  });

});
