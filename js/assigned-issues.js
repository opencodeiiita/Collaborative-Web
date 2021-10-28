let assignedIssueContainer = document.querySelector('.assigned-issues-container');
let spinner = document.querySelector('.spinner-container');

//assigned issues data to be used while searching
let DATA = null;

const setup = async () => {
  //fetch data
  const data = await fetchData();

  //check data
  if (data == null || data == undefined) {
    renderError('Something Went Wrong');
    return console.log('Data NOT found => setup()');
  }

  //render data
  return renderData(data);
};

const fetchData = async () => {
  //loader on
  loadingON();

  //api url
  const url = 'https://opencodeiiita.herokuapp.com/get-issue-assigned/';

  //send request
  const response = await fetch(url);

  //check response
  if (!response.ok) {
    renderError('Something Went Wrong');
    return console.log('something went wrong => fetchData()');
  }

  //parse json
  const data = await response.json();

  //set as global variable
  DATA = data;

  //send data
  return data;
};

const renderData = data => {
  //check data
  if (data == null || data == undefined) {
    renderError('Something Went Wrong');
    return console.log('Data NOT Found => renderData()');
  }

  //render data
  for (const [username, info] of Object.entries(data)) {
    //create element
    let div = document.createElement('div');

    //add classes
    div.classList.add('issue-card');

    //add innerHTML
    div.innerHTML = parseHTML(username, info);

    //append
    assignedIssueContainer.appendChild(div);
  }

  //loading off
  return loadingOFF();
};

const parseHTML = (username, info) => {
  //check data
  if (username == null || username == undefined || info == null || info == undefined) {
    renderError('Something Went Wrong');
    return console.log('Data NOT Found => parseHTML()');
  }

  let html = ``;
  let issues = ``;

  //add issues
  info.issue.forEach(item => {
    issues += `<h5 class="card-title"><a href="https://github.com/opencodeiiita/${item.repoName}/">${item.repoName}</a></h5>
                   <p class="card-text"><a class="text-a" href="https://github.com/opencodeiiita/${item.repoName}/issues/${item.issueID}">#${item.issueID}</a> is assigned to <a class="text-a" href="https://github.com/${username}">${username}</a></p>`;
  });

  //add skeleton
  html += `<div class="card my-3">
                <h3 class="card-header"><a href="https://github.com/${username}">${username}</a><span class="no-of-issues rounded-pill badge bg-light mx-3">${info.number}</span></h3>
                <div class="card-body">${issues}</div>
            </div>`;

  //return html
  return html;
};

const search = () => {
  //get search value
  let searchText = document.querySelector('.search-bar').value.toLowerCase();

  //make DATA object as array
  let dataAsArray = Object.entries(DATA);

  //filter array
  let filteredDataArray = dataAsArray.filter(([key, value]) => {
    // let myReg = new RegExp(searchText + '.*');
    // if (key.match(myReg)) {
    //   return [key, value];
    // }
    if (key.toLowerCase().includes(searchText)) {
      return [key, value];
    }
  });

  //check for empty array
  if (filteredDataArray.length < 1) {
    return renderError('No User Found');
  }

  //convert back to object
  let newData = Object.fromEntries(filteredDataArray);

  //cleanup already rendered data
  unrender();

  //render
  return renderData(newData);
};

const unrender = () => {
  assignedIssueContainer.innerHTML = ``;
};

const renderError = text => {
  assignedIssueContainer.innerHTML = `<h3 class="Error text-center font-weight-bold font-size-large my-5">${text}</h3>`;
};

const loadingON = () => {
  spinner.style.display = 'flex';
};

const loadingOFF = () => {
  spinner.style.display = 'none';
};

window.addEventListener('load', setup);

(function ($) {
  'use strict';

  //Scroll to Top
//  $(document).ready(function () {
//     $(window).scroll(function () {
//       if ($(this).scrollTop() > 100) {
//         $('#scroll').fadeIn();
//       } else {
//         $('#scroll').fadeOut();
//       }
//     });
//     $('#scroll').click(function () {
//       $('html, body').animate({ scrollTop: 0 }, 600);
//       return false;
//     });
//   });

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
