fetch('./data/mentors.json')
.then(function (response) {
    return response.json();
})
.then(function (data) {
    appendData(data);
})
.catch(function (err) {
    console.log('error: ' + err);
});
function appendData(data) {
var mainContainer = document.getElementById("mentors");
for (var i = 0; i < data.length; i++) {
  let element = document.createElement("div");
  element.className = "mentorDiv";

  const imgDiv=document.createElement("div");
  imgDiv.className="imgDiv";


  const image = document.createElement("img");
  image.src= `${data[i].imageurl}`;
  image.className = "mentorImage";


  imgDiv.appendChild(image);
  

  const name = document.createElement("h3");
  name.innerHTML = `${data[i].name}`;
  name.className = "mentorName";


  const about = document.createElement("h4");
  about.innerHTML = `${data[i].about}`;
  about.className = "mentorAbout";

  const logoDiv=document.createElement("div");
  logoDiv.className="logoDiv";
  const fb = document.createElement("a");
  fb.href= `${data[i].facebook}`;
  fb.innerHTML = '<i class="fab fa-facebook fa-2x"></i>';
  fb.className = "icon";

  
  const github = document.createElement("a");
  github.href= `${data[i].github}`;
  github.innerHTML = '<i class="fab fa-github fa-2x"></i>';
  github.className = "icon";


  const twitter = document.createElement("a");
  twitter.href= `${data[i].twitter}`;
  twitter.innerHTML = '<i class="fab fa-twitter fa-2x"></i>';
  twitter.className="icon";

  logoDiv.appendChild(fb);
  logoDiv.appendChild(github);
  logoDiv.appendChild(twitter);
  element.appendChild(imgDiv);
  element.appendChild(name);
  element.appendChild(about);
  element.appendChild(logoDiv)
  mainContainer.appendChild(element);
}
}