var page = 1;
var hasNext = true;
async function getData() {
    let res = await fetch(`https://opencodeiiita.herokuapp.com/get-all-data/?page=${page}`);
    let data = await res.json();
    return data;
}
window.addEventListener('scroll', () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight > scrollHeight - 5) {
        page++;
        if (hasNext) {
            getData().then(data => {
                console.log(data);
                hasNext = data.has_next;
                appendData(data.data);
            });
            
        }
        else{
          $("#participants_loading").remove();
        }
        // setTimeout(createPost, 2000);       
    }

});
getData().then(data => {
    console.log(data);
    hasNext = data.has_next;
    appendData(data.data);
});

async function appendData(data) {
var mainContainer = document.getElementById("participants_cards");
for (var i = 0; i < data.length; i++) {
  let element = document.createElement("div");
  element.className = "participant_card";

    const imgDivvv = document.createElement("div");
    imgDivvv.className = "imgDivvv";

    const image = document.createElement("img");
    image.src = `https://avatars.githubusercontent.com/${data[i].username}?size=200`;
    image.alt = `${data[i].name}`;
    image.className = "participantImage";
    image.loader = "lazy";

    imgDivvv.appendChild(image);

    const name = document.createElement("h3");
    name.innerHTML = (data[i].name&&data[i].name.toLowerCase())||(data[i].username.toLowerCase());
    name.className = "participantName";


    const points = document.createElement("h3");
    points.innerHTML = `Points: ${data[i].totalPoints}`;
    points.className = "participantPoints";

    let college=null;
    if(data[i].college!="N/A" && data[i].college!="null" && data[i].college){
        college = document.createElement("h4");
        college.innerHTML = `${data[i].college}`;
        college.className = "participantCollege";
    }
    const logoDiv = document.createElement("div");
    logoDiv.className = "logoDiv";

    const github = document.createElement("a");
    github.href = `https://github.com/${data[i].username}`;
    github.target = "_blank";
    github.rel = "noopener noreferrer";
    github.innerHTML = '<i class="fab fa-github fa-2x"></i>';
    github.className = "icony";
    github.ariaLabel = "Github link";

    element.appendChild(imgDivvv);
    element.appendChild(name);
    //element.appendChild(logoDiv);
    element.appendChild(github);
    element.appendChild(points);
    if(college!=null){
    element.appendChild(college);
    }
    //on hover show data about the participant

    mainContainer.appendChild(element);

  }
  
}

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
