(function ($) {
  "use strict";

   //Timer
  var destination=new Date('Feb 16,2020 00:00:00').getTime();
  var x=setInterval(function(){
    var startPt=new Date().getTime();
    var journey=destination-startPt;
    document.getElementById('days').textContent = '0'+Math.floor(journey / (1000 * 60 * 60 * 24))+' '+':';
    if(Math.floor((journey % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))/10>=1)
      document.getElementById('hours').textContent = Math.floor((journey % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))+' '+':';
    else
      document.getElementById('hours').textContent = '0'+Math.floor((journey % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))+' '+':';
    if(Math.floor((journey % (1000 * 60 * 60)) / (1000 * 60))/10>=1)
      document.getElementById('minutes').textContent = Math.floor((journey % (1000 * 60 * 60)) / (1000 * 60))+' '+':';
    else
      document.getElementById('minutes').textContent ='0'+ Math.floor((journey % (1000 * 60 * 60)) / (1000 * 60))+' '+':';
    if(Math.floor((journey % (1000 * 60)) / 1000)/10>=1)
      document.getElementById('seconds').textContent= Math.floor((journey % (1000 * 60)) / 1000);
    else
      document.getElementById('seconds').textContent='0'+ Math.floor((journey % (1000 * 60)) / 1000);

  },1000);


  // Header scroll class
  $(window).scroll(function() {
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
  
    nav_sections.each(function() {
      var top = $(this).offset().top - main_nav_height,
          bottom = top + $(this).outerHeight();
  
      if (cur_pos >= top && cur_pos <= bottom) {
        main_nav.find('li').removeClass('active');
        main_nav.find('a[href="#'+$(this).attr('id')+'"]').parent('li').addClass('active');
      }
    });
  });
  //Scroll to top
$(window).scroll(function() {
    var height = $(window).scrollTop();
    if (height > 100) {
        $('#back2Top').fadeIn();
    } else {
        $('#back2Top').fadeOut();
    }
});
$(document).ready(function() {
    $("#back2Top").click(function(event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });
    var table =  $('#myTable');
    partDetails.sort(function(a, b){if(a.name < b.name){return -1;}if(a.name > b.name){return 1;}return 0;})
    var max_size=partDetails.length;
    var sta = 0;
    var elements_per_page = 8;
    var limit = elements_per_page;
    pagination(sta,limit);
    function pagination(sta,limit){
      for(var i=sta;i<limit;i++){
        var f = partDetails[i];
        

     var tab = "<div class=\"col-lg-3 col-sm-6 tiles \"><div class=\"card \" style=\" width: 10rem;\">" + "<img class=\"card-img-top\" src = \" "+f.imageurl+" \" onerror=\"this.src=\'img/prof.png\';\" alt=\"Card image cap\" \"max-width = \"100px\" height = \"160px\"></span> "+"<div class=\"card-body \" height=\"50px\"><span class=\"card-title\">"+"<b>"+ f.name+"</b>"+"</span> "+"<p class=\"card-text\"> <ul class=\"list-group list-group-flush\">"+ "<li class=\"list-group-item\ height=\"50px\"> COLLEGE:<br> " + f.college+ "</li>" +"</ul>"+
        "<span class=\"proj_name\">"+ "<a onclick=\"window.location.href =\'"+  f.github+"\' ;\" style=\"margin-top: 0.1px; margin-right:15px; \" <i class = \"fa fa-2x fa-github-square pointer\"> </a>" + "<a onclick=\"window.location.href =\'"+  f.facebook+"\' ;\" style=\"margin-top: 0.1px;  \" <i class = \"fa fa-2x fa-facebook-square pointer\"> </a> </div> </div>"
        // console.log(tblRow)
      // var tab='<tr><td>'+partDetails[i].name+"\n"+'</td><td><img src="'+partDetails[i].imageurl+"\n"+'" alt="" border=3 height=100 width=300></img></td><td>'+partDetails[i].about+"\n"+'</td><td>'+partDetails[i].college+"\n"+'</td><td>'
      //           +partDetails[i].facebook+"\n"+'</td><td>'+partDetails[i].github+"\n"+'</td><td>'+partDetails[i].twitter+"\n"+'</td><td>'
      //           +partDetails[i].referral+"\n"+'</td><td>'+partDetails[i].Gender+"\n"+'</td></tr>';
               //<span class=\"proj_name\">"+ "<div class = \"displa\"><button class = \"lin\" onclick=\"window.location.href =\'"+  f.github+"\' ;\" style=\"margin-top: 0.1px;\"><span>"+ "Github"+ "</span></button> </div> <button class = \"lin\" onclick=\"window.location.href =\' "+  f.facebook+"\' ;\" style=\"margin-top: 0.1px;\"><span>"+ "Facebook"+ "</span></button> </div> </div>";

       $('#myTable').append(tab)

      }
    }
    $('#nextValue').click(function(){
      var next = limit;
      if(max_size>=next) {
      limit = limit+elements_per_page;
      table.empty();
      pagination(next,limit);
      }
    });
      $('#PreValue').click(function(){
      var pre = limit-(2*elements_per_page);
      if(pre>=0) {
      limit = limit-elements_per_page;
      table.empty();
      pagination(pre,limit); 
      }
    });
         var number = Math.round(partDetails.length / elements_per_page);

       for(var i=0;i<=number;i++) {
         var pno= i+1;
        $('.paginationList').append('<button type="button" class="btn btn-secondary" id="'+i+'">'+i+'</button>');
       }
       $('.paginationList button').click(function(){
             var start = $(this).text();
             table.empty();
             var limit = 8*(parseInt(start)+1) > max_size ? max_size: 8*(parseInt(start)+1)
            pagination(start*8,limit); 
       });

      // mentors
      var size=mentorDetails.length;
      for(var i=0;i<size;i++){
        var f = mentorDetails[i];
        var tabm = "<div class=\"col-lg-3 col-sm-6 tiles \"><div class=\"card mentCard\" >" + "<img class=\"card-img-top\" src = \" "+f.imageurl+" \" onerror=\"this.src=\'img/prof.png\';\" alt=\"Card image cap\"></span> "+"<div class=\"card-body \" height=\"50px\"><span class=\"card-title\">"+ f.name+"</span> "+"<ul class=\"list-group list-group-flush\">"+ "<li class=\"list-group-item\ height=\"50px\"> About: " + f.about+ "</li>" +"</ul>"+
            "<span class=\"proj_name\">"+ "<button class = \"lin\" onclick=\"window.location.href =\'"+  f.github+"\' ;\" ><span>"+ "Github"+ "</span></button> <button class = \"lin\" onclick=\"window.location.href =\' "+  f.facebook+"\' ;\" ><span>"+ "Facebook"+ "</span></button> </div> </div>"
        $('#myMentorTable').append(tabm)
      }
});


})(jQuery);