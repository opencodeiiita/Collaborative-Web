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

  card.append(ProjectCardContent);
  ProjectCardContent.append(projectName, projectDescription, projectLink);
  projectCardsContainer.append(card);
}
fetchGetCards();
