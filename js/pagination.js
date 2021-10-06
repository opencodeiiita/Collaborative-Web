// PAGNATION

const BASE_URL = 'https://opencodeiiita.herokuapp.com/get-all-data/?page=1';

const prev = document.getElementById('prev');
const next = document.getElementById('next');
const current = document.getElementById('current');
var pointSet = new Set();
var currentPage = 1;
var nextPage = 2;
var prevPage = 0;
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
      data.forEach(elem => {
        pointSet.add(elem.totalPoints);
      });
      return data;
    })
    .then(data => {
      addToTable(data);
    });

  document.getElementById('current').innerHTML = `${currentPage}`;
  nextPage = currentPage + 1;
  totalPages = 250;
}

function addToTable(arr) {
  let rank = 0;
  for (var i = 0; i < arr.length; i++) {
    let user = arr[i].username;
    let points = arr[i].totalPoints;
    let fullName = arr[i].name;
    rank = [...pointSet].indexOf(points) + 1;
    let markup =
      '<tr><td>' +
      rank +
      '</td><td> ' +
      '&nbsp;' +
      user +
      '</td><td> ' +
      '&nbsp;' +
      points +
      '</td><td> ' +
      '&nbsp;' +
      fullName +
      '</td></tr>';
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
