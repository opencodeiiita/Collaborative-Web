fetch("https://opencodeiiita.herokuapp.com/get-all-data/?page=-1")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    appendData(data);
  })
  .catch(function (err) {
    console.log("error: " + err);
  });
async function appendData(data) {
var mainContainer = document.getElementById("participants_cards");
for (var i = 0; i < data.length; i++) {
  let element = document.createElement("div");
  element.className = "participant_card";

    const imgDiv = document.createElement("div");
    imgDiv.className = "imgDiv";

    const image = document.createElement("img");
    image.src = `https://avatars.githubusercontent.com/${data[i].username}?size=200`;
    image.alt = `${data[i].name}`;
    image.className = "participantImage";
    image.loader = "lazy";

    imgDiv.appendChild(image);

    const name = document.createElement("h3");
    name.innerHTML = `${data[i].name}`;
    name.className = "participantName";

    const points = document.createElement("h3");
    points.innerHTML = `Points: ${data[i].totalPoints}`;
    points.className = "participantPoints";

    let college=null;
    if(data[i].college!="N/A" && data[i].college!="null"){
        college = document.createElement("h4");
        college.innerHTML = `${data[i].college}`;
        college.className = "participantCollege";
    }
    const logoDiv = document.createElement("div");
    logoDiv.className = "logoDiv";
/*
    const logoDiv = document.createElement("div");
    logoDiv.className = "logoDiv";
    const fb = document.createElement("a");
    fb.target = "_blank";
    fb.rel = "noopener noreferrer";
    fb.href = `${data[i].facebook}`;
    fb.innerHTML = '<i class="fab fa-facebook fa-2x"></i>';
    fb.className = "icon";
    fb.ariaLabel = "Facebook link";
*/
    const github = document.createElement("a");
    github.href = `https://github.com/${data[i].username}`;
    github.target = "_blank";
    github.rel = "noopener noreferrer";
    github.innerHTML = '<i class="fab fa-github fa-2x"></i>';
    github.className = "icony";
    github.ariaLabel = "Github link";
/*
    const twitter = document.createElement("a");
    twitter.href = `${data[i].twitter}`;
    twitter.target = "_blank";
    twitter.rel = "noopener";
    twitter.innerHTML = '<i class="fab fa-twitter fa-2x"></i>';
    twitter.className = "icon";
    twitter.ariaLabel = "Twitter link";*/

    //logoDiv.appendChild(fb);
  //  logoDiv.appendChild(github);
    //logoDiv.appendChild(twitter);
    element.appendChild(imgDiv);
    element.appendChild(name);
    //element.appendChild(logoDiv);
    element.appendChild(github);
    element.appendChild(points);
    if(college!=null){
    element.appendChild(college);
    }
    
    mainContainer.appendChild(element);
  }
}
