const main = document.querySelector('main');
var cont = 0;
var description = false;

window.addEventListener('load', e => {
  updateMovies(cont);
});

async function updateMovies(cont) {
  const resMovies = await fetch('https://swapi.co/api/films/');
  const jsonMovies = await resMovies.json();
  p = document.createElement("p");
  var movieDescription = '';
  var people = '';
  movieDescription += movieDescription + "<strong>Título: </strong>" + jsonMovies.results[cont].title + "<br />"
    + "<strong>Data de lançamento: </strong>" + jsonMovies.results[cont].release_date + "<br />"
    + "<strong>Diretor: </strong>" + jsonMovies.results[cont].director + "<br />"
    + "<strong>Sinopse: </strong>" + jsonMovies.results[cont].opening_crawl + "<br />" + "<br />";


  if (description) {
    people = "<strong>Personagens: </strong><br />";
    for (let index = 0; index < jsonMovies.results[cont].characters.length; index++) {
      var url = jsonMovies.results[cont].characters[index];
      const resPeople = await fetch(url);
      const jsonPeople = await resPeople.json();
       people += jsonPeople.name + "<br />";
    }
    p.innerHTML = movieDescription + people
  }
  else {
    p.innerHTML = movieDescription;
  }
  return document.body.appendChild(p);
}

// Botões
var button = document.createElement("button");
button.innerHTML = "Filme anterior";

var body = document.getElementsByTagName("body")[0];
body.appendChild(button);

button.addEventListener("click", function () {
  lastMovie();
});

var button = document.createElement("button");
button.innerHTML = "Descrição completa";

var body = document.getElementsByTagName("body")[0];
body.appendChild(button);

button.addEventListener("click", function () {
  fullDescription();
});

var button = document.createElement("button");
button.innerHTML = "Próximo Filme";

var body = document.getElementsByTagName("body")[0];
body.appendChild(button);

button.addEventListener("click", function () {
  nextMovie();
});

function nextMovie() {
  cont++;
  p.innerHTML = "";
  updateMovies(cont);
} false

function lastMovie() {
  cont--;
  p.innerHTML = "";
  updateMovies(cont);
}

function fullDescription() {
  p.innerHTML = "";
  if(description === false){
    description = true;
  }
  else{
    description = false;
  }
  updateMovies(cont);
}