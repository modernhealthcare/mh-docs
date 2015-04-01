$(document).ready(function () {

  $('h1,h2,h3,h4,h5,h6').each(function() {
    var link = '<span class="icon-link"></span>';
    if ($(this).attr('id')) {
      $(this).prepend(link);
    }
  });

  $(function() {
    $('a[href="#"]').click(function(e) {
      $('html,body').animate({
        scrollTop: 0
      }, 400);
      e.preventDefault();
    });
    $('a[href*="#"]:not([href="#"])').click(function(e) {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
          scrollTop: target.offset().top
          }, 400);
        }
      }
      e.preventDefault();
    });
  });

  var offset = 300,
  offsetOpacity = 1200,
  scrollTopDuration = 700,
  $toTop = $('.to-top');

  $(window).scroll(function() {
    ( $(this).scrollTop() > offset ) ? $toTop.addClass('is-visible') : $toTop.removeClass('is-visible fade-out');
    if ( $(this).scrollTop() > offsetOpacity ) {
      $toTop.addClass('fade-out');
    }
  });

  var d = new Date();
  var n = d.getFullYear();
  $('.current-yr').text(n);


});
