let projectCardsContainer = document.getElementById('project__cards');

function fetchGetCards() {
  d3.json('https://raw.githubusercontent.com/opencodeiiita/Collaborative-Web/main/data/projects.json').then(
    cardData => renderCard(cardData)
  );
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
  setAttributes(card, { class: 'project__card' });

  const projectName = document.createElement('h2');
  projectName.setAttribute('class', 'card__title');
  projectName.innerText = project.name;

  const projectDescription = document.createElement('h3');
  projectDescription.setAttribute('class', 'card__content');
  projectDescription.innerText = project.description;

  const projectLinkContainer = document.createElement('p');
  projectLinkContainer.setAttribute('class', `link__container`);

  const projectLink = document.createElement('a');
  projectLink.setAttribute('class', 'card__link');
  projectLink.setAttribute('href', `${project['repo-url']}`);
  projectLink.innerText = 'Project Link >';

  //Setting up another link for 'Learn More' page
  const projectIssuesLink = document.createElement('a');
  //Get the project's repo name
  //Some of the repo names returned from here contains forward slashes in end
  //These are needed to be removed
  const repoNameWithSlashes = project['repo-url'].split('https://github.com/opencodeiiita/')[1];
  //Removing forward slashes at the end
  const repoName = repoNameWithSlashes.split('/')[0];
  //Passing the repo name as query string to fetch the issues for the repo when the page loads
  projectIssuesLink.setAttribute('class', 'card__link');
  projectIssuesLink.setAttribute('href', `/Collaborative-Web/project-issues.html?project=${repoName}`);
  projectIssuesLink.innerText = 'Issues >';

  projectLinkContainer.append(projectLink, projectIssuesLink);

  card.append(projectName, projectDescription, projectLinkContainer);

  projectCardsContainer.append(card);
}
fetchGetCards();
