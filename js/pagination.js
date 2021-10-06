// PAGNATION

const BASE_URL = 'https://opencodeiiita.herokuapp.com/get-all-data/?page=1';

const prev = document.getElementById('prev');
const next = document.getElementById('next');
const current = document.getElementById('current');

var currentPage = 1;
var nextPage = 2;
var prevPage = 0;
var lastUrl = '';
var totalPages = 100;

function getData(url, currPage) {
  currentPage = currPage;
  prevPage = currentPage - 1;
  if (prevPage == 0) document.getElementById('prev').classList.add('disabled');
  else document.getElementById('prev').classList.remove('disabled');

  fetch(url)
    .then(res => res.json())
    .then(pageData => {
      currentPage = pageData.page_number;
      return (participantsData = pageData.data);
    })
    .then(data => {
      console.log(data);
      addToTable(data);
    });
  document.getElementById('current').innerHTML = `${currentPage}`;
  console.log(currentPage);
  nextPage = currentPage + 1;
  console.log(nextPage);
  console.log(prevPage);

  totalPages = 250;
}

function addToTable(arr) {
  var set = new Set();
  for (i = 0; i < arr.length; i++) {
    set.add(arr[i].totalPoints);
  }
  var i;
  for (i = 0; i < arr.length; i++) {
    user = arr[i].username;
    points = arr[i].totalPoints;
    name = arr[i].name;

    rank = [...set].indexOf(arr[i].totalPoints) + 1;
    let markup =
      '<tr>><td>' + user + '</td><td> ' + '&nbsp;' + points + '</td><td> ' + '&nbsp;' + name + '</td></tr>';

    $('table tbody').append(markup);
  }
}

getData(BASE_URL, currentPage);

next.addEventListener('click', () => {
  if (nextPage < totalPages) pageCall(nextPage);
});

prev.addEventListener('click', () => {
  console.log(prevPage);
  if (prevPage > 0) pageCall(prevPage);
});

function pageCall(page_number) {
  url = `https://opencodeiiita.herokuapp.com/get-all-data/?page=${page_number}`;
  document.getElementById('participantsList').innerHTML = ``;
  getData(url, page_number);
}
