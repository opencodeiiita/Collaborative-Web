const issuesContainer = document.querySelector('.project-issues-container');
const spinner = document.querySelector('.spinner-container');
window.addEventListener('load', setup);

async function setup() {
  const ownerName = 'opencodeiiita';
  const repoName = getRepoName();
  const issues = await fetchIssues(ownerName, repoName);
  renderIssues(issues);
}

function getRepoName() {
  const url = new URL(window.location.href);
  const projectRepoName = url.searchParams.get('project');
  return projectRepoName;
}

async function fetchIssues(ownerName, repoName) {
  spinnerON();
  const url = `https://api.github.com/repos/${ownerName}/${repoName}/issues`;
  const response = await fetch(url);
  const data = await response.json();
  spinnerOFF();
  return data;
}

function renderIssues(issues) {
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
