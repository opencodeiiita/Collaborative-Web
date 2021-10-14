(function ($) {
  'use strict';

  //Scroll to Top
  $(document).ready(function () {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        $('#scroll').fadeIn();
      } else {
        $('#scroll').fadeOut();
      }
    });
    $('#scroll').click(function () {
      $('html, body').animate({ scrollTop: 0 }, 600);
      return false;
    });
  });

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

//Typewrite effect js--------------------------------------------------------------------
var aText = new Array(
  'Some of our projects:'
  // "The next line come here... and so on"
);
var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName('typewrite');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement('style');
  css.type = 'text/css';
  css.innerHTML = '.typewrite > .wrap { border-right: 0.08em solid #000}';
  document.body.appendChild(css);
};
//Typewrite js ends here-------------------------------------------------
