let projectCardsContainer = document.getElementById('projectCardsContainer');

function fetchGetCards() {
  d3.json('https://raw.githubusercontent.com/opencodeiiita/Collaborative-Web/main/data/projects.json')
    .then(cardData => renderCard(cardData));
}
function setAttributes(element, attributes) {
  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
function renderCard(cardData) {
  cardData.forEach(project => {
    createCard(project);
  });
}

function createCard(project) {
  const card = document.createElement('div');
  setAttributes(card, { class: 'ProjectCard' });

  const ProjectCardContent = document.createElement('div');
  ProjectCardContent.setAttribute('class', 'ProjectCardContent');

  const projectName = document.createElement('h3');
  projectName.setAttribute('class', 'projectName');
  projectName.innerText = project.name;

  const projectDescription = document.createElement('p');
  projectDescription.setAttribute('class', 'projectDescription');
  projectDescription.innerText = project.description;

  const projectLink = document.createElement('a');
  projectLink.setAttribute('href', `${project["repo-url"]}`);
  projectLink.innerText = "Project Link";
  
  //Setting up another link for 'Learn More' page
  const projectIssuesLink = document.createElement('a');
  //Get the project's repo name
  //Some of the repo names returned from here contains forward slashes in end
  //These are needed to be removed
  const repoNameWithSlashes = project['repo-url'].split('https://github.com/opencodeiiita/')[1];
  //Removing forward slashes at the end
  const repoName = repoNameWithSlashes.split('/')[0];
  //Passing the repo name as query string to fetch the issues for the repo when the page loads
  projectIssuesLink.setAttribute('href', `/Collaborative-Web/project-issues.html?project=${repoName}`);
  projectIssuesLink.innerText = "Learn more";

  card.append(ProjectCardContent);
  ProjectCardContent.append(projectName, projectDescription, projectLink, projectIssuesLink);
  projectCardsContainer.append(card);
}
fetchGetCards();
