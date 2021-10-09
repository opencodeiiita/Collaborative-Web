//Some Elements
const issuesContainer = document.querySelector('.project-issues-container');
const pageHeading = document.querySelector('.page-heading');
const spinner = document.querySelector('.spinner-container');
//Page no.
var PAGE = 1;
var isFetching = true;
var hasNext = true;
//Limit Exceed
var limitExceed = {
  message:
    "API rate limit exceeded for 157.34.63.7. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)",
  documentation_url:
    'https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting',
};

window.addEventListener('load', setup);
window.addEventListener('scroll', handleScroll);

async function handleScroll() {
  if (isFetching) return;
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    PAGE++;
    isFetching = true;
    if (hasNext) {
      await setup();
    } else {
      isFetching = true;
    }
  }
}

async function setup() {
  const ownerName = 'opencodeiiita';
  const repoName = getRepoName();

  //Set page heading
  pageHeading.innerText = repoName;

  let issues = await fetchIssues(ownerName, repoName);

  //Filter issues from data
  if (deepEqual(issues, limitExceed)) {
    renderError()
    return;
  }
  issues = issues.filter((issue) => {
    if (!issue['pull_request']) {
      return issue;
    }
    return;
  });

  renderIssues(issues);
}

function getRepoName() {
  const url = new URL(window.location.href);
  const projectRepoName = url.searchParams.get('project');
  return projectRepoName;
}

async function fetchIssues(ownerName, repoName) {
  isFetching = true;
  spinnerON();
  const url = `https://api.github.com/repos/${ownerName}/${repoName}/issues?page=${PAGE}&state=all`;
  const response = await fetch(url);
  const data = await response.json();
  isFetching = false;
  spinnerOFF();
  return data;
}

function renderIssues(issues) {
  if (issues.length < 1) return;
  issues.forEach((issue) => {
    let div = document.createElement('div');
    div.classList.add('issue-card', 'border', 'my-3');
    //Formating issue creation date
    const date = new Date(issue.created_at).toLocaleDateString();

    //Making label
    let labelsOfIssue = ``;

    issue.labels.forEach((label) => {
      //Check if background color is light or dark
      //True, if color light
      //False, if color dark
      const colorIsLight = hex_is_light(label.color);
      //If background color is light, then font color is black
      //If background color is dark, then font color is white
      labelsOfIssue += `<span class="badge badge-pill mx-1" style="background: #${
        label.color
      }; color: ${colorIsLight ? '#000' : '#FFF'}">${label.name}</span>`;
    });

    if (issue.closed_at) {
      labelsOfIssue += `<span class="badge badge-pill mx-1" style="background: #cf222e; color: #FFF">closed</span>`;
    }

    div.innerHTML = `<div class="card-body">
                        <h5 class="card-title font-weight-bold">
                            <a href=${issue.html_url} target="_blank">${issue.title}</a>
                        </h5>
                        <p class="card-text">
                        #${issue.number} opened by
                        <a href=${issue.user.html_url} target="_blank">${issue.user.login}</a>
                        on ${date}
                        </p>
                        <div class="label-container">${labelsOfIssue}</div>
                    </div>`;
    issuesContainer.appendChild(div);
  });
}

function renderError() {
  let div = document.createElement('h3');
  div.classList.add('Error', 'text-center', 'font-weight-bold', 'font-size-large', 'my-3');
  div.innerText = 'Something went wrong';
  issuesContainer.appendChild(div);
}

//Function credits : https://stackoverflow.com/a/51567564/15807973
function hex_is_light(color) {
  const hex = color.replace('#', '');
  const c_r = parseInt(hex.substr(0, 2), 16);
  const c_g = parseInt(hex.substr(2, 2), 16);
  const c_b = parseInt(hex.substr(4, 2), 16);
  const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
  return brightness > 155;
}

function spinnerON() {
  spinner.style.display = 'flex';
}
function spinnerOFF() {
  spinner.style.display = 'none';
}
function deepEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !deepEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }
  return true;
}
function isObject(object) {
  return object != null && typeof object === 'object';
}
