const main = document.querySelector('main');
let cont = 0;
let description = false;
let descriptionString = "";
let resMovies = '', jsonMovies = '';
p = document.createElement("p");

window.addEventListener('load', e => {
  update();
});

async function update() {
  resMovies = await fetch('https://swapi.co/api/films/');
  jsonMovies = await resMovies.json();
  updateMovies(cont, jsonMovies);
}
async function updateMovies(cont, jsonMovies) {

  var movieDescription = "Filme nº: " + (cont + 1);


  movieDescription += "<br />" + "<strong>Título: </strong>" + jsonMovies.results[cont].title + "<br />"
    + "<strong>Data de lançamento: </strong>" + jsonMovies.results[cont].release_date + "<br />"
    + "<strong>Diretor: </strong>" + jsonMovies.results[cont].director + "<br />"
    + "<strong>Sinopse: </strong>" + jsonMovies.results[cont].opening_crawl + "<br />" + "<br />";

  if (description) {
    updatePeople(movieDescription);
    document.body.appendChild(p);
  }
  else {
    p.innerHTML = movieDescription;
    document.body.appendChild(p);
  }
  return true;
}

async function updatePeople(movieDescription) {
  var descriptionFull = "<strong>Personagens: </strong><br />";
  for (let index = 0; index < jsonMovies.results[cont].characters.length; index++) {
    var url = jsonMovies.results[cont].characters[index];
    const resPeople = await fetch(url);
    const jsonPeople = await resPeople.json();
    descriptionFull += jsonPeople.name + "<br />";
  }
  descriptionString = movieDescription + descriptionFull;
  p.innerHTML = descriptionString;
  document.body.appendChild(p);
  updatePlanets(descriptionString);
  return true;
}

async function updatePlanets (descriptionString) {
  let descriptionFull = "<br /><Strong>Planetas: </strong><br />";
  for (let index = 0; index < jsonMovies.results[cont].planets.length; index++) {
    let url = jsonMovies.results[cont].planets[index];
    const resPlanets = await fetch(url);
    const jsonPlanets = await resPlanets.json();
    descriptionFull += jsonPlanets.name + "<br />";
  }
  p.innerHTML = "";
  descriptionString = descriptionString + descriptionFull;
  document.body.appendChild(p);
  updateShips(descriptionString);
  return p.innerHTML = descriptionString;
}

async function updateShips(descriptionString){
  let descriptionFull = "<br /><Strong>Naves: </strong><br />";
  for (let index = 0; index < jsonMovies.results[cont].starships.length; index++) {
    let url = jsonMovies.results[cont].starships[index];
    const resShips = await fetch(url);
    const jsonShips = await resShips.json();
    descriptionFull += jsonShips.name + "<br />";
  }
  p.innerHTML = "";
  descriptionString = descriptionString + descriptionFull;
  document.body.appendChild(p);
  updateSpecies(descriptionString);
  return p.innerHTML = descriptionString;
}

async function updateSpecies(descriptionString){
  let descriptionFull = "<br /><Strong>Espécies: </strong><br />";
  for (let index = 0; index < jsonMovies.results[cont].species.length; index++) {
    let url = jsonMovies.results[cont].species[index];
    const resSpecies = await fetch(url);
    const jsonSpecies = await resSpecies.json();
    descriptionFull += jsonSpecies.name + "<br />";
  }
  p.innerHTML = "";
  buttondes.innerHTML = "Descrição completa";
  descriptionString = descriptionString + descriptionFull;
  document.body.appendChild(p);
  return p.innerHTML = descriptionString;
}
// Botões
var button = document.createElement("button");
button.innerHTML = "Filme anterior";

var body = document.getElementsByTagName("body")[0];
body.appendChild(button);

button.addEventListener("click", function () {
  lastMovie();
});

var buttondes = document.createElement("button");
buttondes.innerHTML = "Descrição completa";

var body = document.getElementsByTagName("body")[0];
body.appendChild(buttondes);

buttondes.addEventListener("click", function () {
  descriptionBool();
});

var button = document.createElement("button");
button.innerHTML = "Próximo Filme";

var body = document.getElementsByTagName("body")[0];
body.appendChild(button);

button.addEventListener("click", function () {
  nextMovie();
});

function nextMovie() {
  if (cont != 6) {
    cont++;
    p.innerHTML = "";
    if(description){
      buttondes.innerHTML = "Carregando...";
    }
    updateMovies(cont, jsonMovies);
  }
  else {
    cont = 0;
    p.innerHTML = "";
    updateMovies(cont, jsonMovies);
  }
}

function lastMovie() {
  if (cont != 0) {
    cont--;
    p.innerHTML = "";
    if(description){
      buttondes.innerHTML = "Carregando...";
    }
    updateMovies(cont, jsonMovies);
  }
  else {
    cont = 6;
    p.innerHTML = "";
    updateMovies(cont, jsonMovies);
  }
}

function descriptionBool() {
  if (description === false) {
    buttondes.innerHTML = "Carregando...";
    description = true;
  }
  else {
    description = false;
  }
  updateMovies(cont, jsonMovies);
}