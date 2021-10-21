let projectCardsContainer = document.getElementById('project__cards');

function fetchGetCards() {
  d3.json('https://raw.githubusercontent.com/opencodeiiita/Collaborative-Web/main/data/projects.json').then(
    cardData => renderCard(cardData)
  );
}
const repotoimage ={
"Collaborative-Web":"collaborative_web.svg",
"AskUs Backend":"ask_us_back.svg",
"AskUs Frontend":"ask_us_front.svg",
"Auction DApp":"auction.svg"     ,
"Coder Queen":"coder_queen.svg" ,
"Code Trouble":"code_trouble.svg",
"Collaborative App":"collab_app.svg",
"Contest Countdown":"cont_count.svg",
"Find My Roomie":"find_room.svg",
"GeekChat":"geek_chat.svg",
"Geek Editor Backend":"geek_edit_back.svg",
"Geek Editor Frontend":"geek_edit_front.svg",
"GoGit":"go_git.svg",
"Information Chest":"info_chest.svg",
"Leaderboard Frontend":"leader_front.svg",
"Let's Design 2.0":"lets_design_2.svg",
"LiblessML":"libless_ml.svg",
"Numismatics":"numismatics.svg",
"OpenCode Revamp":"oc_revamp.svg",
"PanoViewer":"pano_viewer.svg",
"PhotoStore":"photo_store.svg",
"ProductivityTracker":"prod_track.svg",
"Shopping Cart":"shop_cart.svg",
"Warriors":"warriors.svg",
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
  //Image
  /*
  const image = document.createElement('img');
  image.src=`/img/projects/${repotoimage[project.name]}`;
  image.style="width:100%; height: auto;"
  */
  const image = document.createElement('div');
  image.setAttribute('id',`${project.name}-image`)
  let url=`https://shashwat-mittal.github.io/img/projects/${repotoimage[project.name]}`;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status == 200) {
                    document.getElementById(`${project.name}-image`).innerHTML = xhr.responseText;
            }
    };
  xhr.send();

  image.style="width:100%; height: auto;"
  image.classList.add("projectimage");
  console.log(project.name, repotoimage[project.name]);
  //Passing the repo name as query string to fetch the issues for the repo when the page loads
  projectIssuesLink.setAttribute('class', 'card__link');
  projectIssuesLink.setAttribute('href', `/Collaborative-Web/project-issues.html?project=${repoName}`);
  projectIssuesLink.innerText = 'Issues >';

  projectLinkContainer.append(projectLink, projectIssuesLink);

  card.append(image,projectName, projectDescription, projectLinkContainer);

  projectCardsContainer.append(card);
}
fetchGetCards();