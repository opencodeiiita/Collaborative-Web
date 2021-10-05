(function ($) {
  'use strict';

  // Header scroll class
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.main-nav, .mobile-nav');
  var main_nav_height = $('#header').outerHeight();

  $(window).on('scroll', function () {
    var cur_pos = $(this).scrollTop();

    nav_sections.each(function () {
      var top = $(this).offset().top - main_nav_height,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        main_nav.find('li').removeClass('active');
        main_nav
          .find('a[href="#' + $(this).attr('id') + '"]')
          .parent('li')
          .addClass('active');
      }
    });
  });
})(jQuery);

(function () {
  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

  let today = new Date(),
    dd = String(today.getDate()).padStart(2, '0'),
    mm = String(today.getMonth() + 1).padStart(2, '0'),
    yyyy = today.getFullYear(),
    nextYear = yyyy + 1,
    dayMonth = '11/04/',
    lastday = dayMonth + yyyy;

  today = mm + '/' + dd + '/' + yyyy;
  if (today > lastday) {
    lastday = dayMonth + nextYear;
  }

  const countDown = new Date(lastday).getTime(),
    x = setInterval(function () {
      const now = new Date().getTime(),
        distance = countDown - now;

      document.getElementById('days').innerText = Math.floor(distance / day);
      document.getElementById('hours').innerText = Math.floor((distance % day) / hour);
      document.getElementById('minutes').innerText = Math.floor((distance % hour) / minute);
      document.getElementById('seconds').innerText = Math.floor((distance % minute) / second);

      //do something later when date is reached
      if (distance < 0) {
        document.getElementById('headline').innerText = 'Opencode Has ended';
        document.getElementById('countdown').style.display = 'none';
        document.getElementById('content').style.display = 'block';
        clearInterval(x);
      }
      //seconds
    }, 0);
})();
