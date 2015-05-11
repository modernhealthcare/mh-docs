$(document).ready(function () {

  var $doc = $('html, body');

  $(function() {
    var $toggle = $('[data-js="nav-toggle"]');
    var $nav = $('[data-js="nav-sidebar"]');

    $toggle.click(function(e) {
      var $this = $(this);

      if (!$this.hasClass('active')) {
        $doc.addClass('menu-active');
        $this.addClass('active');
        $nav.fadeIn(350);
      } else {
        $doc.removeClass('menu-active');
        $this.removeClass('active');
        $nav.fadeOut(350);
      }
    });

    $(window).resize(function() {
      if ($(window).width() >= 768) {
        $toggle.removeClass('active');
        $nav.css('display', 'none');
      }
    });
  });

  $(function() {
    var $toggle = $('[data-js="nav-toggle"]');
    var $nav = $('[data-js="nav-sidebar"]');
    var $navLink = $('[data-js="sub-nav"] a');

    $('a[href*="#"]:not([href="#"])').click(function(e) {
      var target = $(this.hash);

      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {

        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

        if (target.length) {
          $doc.animate({
            scrollTop: target.offset().top
          }, 400);
        }
        if ($doc.hasClass('menu-active')) {
          $doc.removeClass('menu-active');
          $toggle.removeClass('active');
          $nav.fadeOut(350);
        }
      }

      e.preventDefault();
    });
  });

  var $nav = $('[data-js="sub-nav"]');
  var $navItem = $('[data-js="sub-nav"] li');
  var $navLink = $('[data-js="sub-nav"] a');
  var $section = $('section');
  var navChildren = $navItem.children();
  var navArray = [];

  for (var i = 0; i < navChildren.length; i++) {
    var navChild = navChildren[i];
    var navHref = $(navChild).attr('href');

    navArray.push(navHref);
  }

  $(window).scroll(function() {
    var winPos = $(window).scrollTop();
    var winH = $(window).height();
    var docH = $(document).height();

    for (var i = 0; i < navArray.length; i++) {
      var Id = navArray[i];
      var $sec = $('[data-js="' + Id + '"]');
      var secH = $sec.height();
      var secPos = $sec.offset().top - 64;

      if (winPos >= secPos && winPos < (secPos + secH)) {
        $('a[href="' + Id + '"]').addClass('nav-active');
      } else {
        $('a[href="' + Id + '"]').removeClass('nav-active');
      }
    }

    if (winPos + winH == docH) {
      var $navItemLast = $('[data-js="sub-nav"] li:last-child a');

      if (!$navItemLast.hasClass('nav-active')) {
        var navCurr = $('.nav-active').attr('href');

        $('a[href="' + navCurr + '"]').removeClass('nav-active');
        $navItemLast.addClass('nav-active');
      }
    }

  });

  var d = new Date();
  var n = d.getFullYear();
  var $copyright = $('[data-js="copyright"]');
  $copyright.html('Copyright &copy; ' + n + ' <a href="http://www.modernhealthcare.com">Modern Healthcare</a>');

});
