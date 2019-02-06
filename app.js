//Váriaveis globais
let cont = 0;

//Cria uma sequência corrigindo a ordem dos filmes por data de lançamento em referência ao jsonMovies.
let orderFilm = [0, 5, 4, 2, 1, 3, 6];
let description = false;
let descriptionString = "";
let resMovies = '', jsonMovies = '';
p = document.createElement("p");

//Primeiro carregamento da página, irá exibir o primeiro filme.
window.addEventListener('load', e => {
  update();
});

//Carrega em um Json os filmes e alguns detalhes da API
async function update() {
  resMovies = await fetch('https://swapi.co/api/films/');
  jsonMovies = await resMovies.json();
  updateMovies(cont, jsonMovies);
}

//Função para navegar direto para um filme pelo nome.
function updateSideBar(cont){
  updateMovies(cont, jsonMovies);
}

//Atualiza as informações do filme de acordo com o seu número e o Json dos filmes
async function updateMovies(cont, jsonMovies) {
  let movieDescription = '';
  switch (cont) {
    case 0:
      movieDescription = "<img src='https://upload.wikimedia.org/wikipedia/pt/f/f6/Pôster_Star_Wars.jpg' width='280' height='425'>";
      break;
    case 1:
      movieDescription = "<img src='https://upload.wikimedia.org/wikipedia/pt/5/5c/The_Empire_Strikes_Back.jpg' width='280' height='425'>";
      break;
    case 2:
      movieDescription = "<img src='https://upload.wikimedia.org/wikipedia/pt/b/b2/ReturnOfTheJediPoster1983.jpg' width='280' height='425'>";
      break;
    case 3:
      movieDescription = "<img src='https://upload.wikimedia.org/wikipedia/pt/0/05/Star_Wars_Phantom_Menace_-_P%C3%B4ster.jpg'width='280' height='425'>";
      break;
    case 4:
      movieDescription = "<img src='https://upload.wikimedia.org/wikipedia/pt/6/63/Star_Wars_The_Clone_Wars.jpg' width='280' height='425'>";
      break;
    case 5:
      movieDescription = "<img src='https://upload.wikimedia.org/wikipedia/pt/5/58/Star_Wars_Epis%C3%B3dio_III_A_Vingan%C3%A7a_dos_Sith.jpg' width='280' height='425'>";
      break;
    case 6:
      movieDescription = "<img src='https://upload.wikimedia.org/wikipedia/pt/a/ae/Starwars_06.jpg' width='280' height='425'>";
      break;
    default:
      break;
  }
  movieDescription = movieDescription + " <br />Filme nº: " + (cont + 1);
  movieDescription += "<br />" +"<strong>Título: </strong>" + jsonMovies.results[orderFilm[cont]].title + "<br />"
    + "<strong>Data de lançamento: </strong>" + jsonMovies.results[orderFilm[cont]].release_date + "<br />"
    + "<strong>Diretor: </strong>" + jsonMovies.results[orderFilm[cont]].director + "<br />"
    + "<strong>Sinopse: </strong>" + jsonMovies.results[orderFilm[cont]].opening_crawl + "<br />" + "<br />";

  //Caso o botão de descrição detalhada foi clicado, irá chamar o metodo para mostrar os detalhes.
  if (description) {
    updatePeople(movieDescription);
    document.body.appendChild(p);
  }
  else {
    p.innerHTML = movieDescription;
    document.body.appendChild(p);
  }
}

//Atualiza as informações das pessoas de acordo com o filme atual exibido na página e recebe
//a String movieDescription
async function updatePeople(movieDescription) {
  let descriptionFull = "<strong>Personagens: </strong><br />";
  for (let index = 0; index < jsonMovies.results[cont].characters.length; index++) {
    let url = jsonMovies.results[orderFilm[cont]].characters[index];
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

//Atualiza os planetas
async function updatePlanets(descriptionString) {
  let descriptionFull = "<br /><Strong>Planetas: </strong><br />";
  for (let index = 0; index < jsonMovies.results[cont].planets.length; index++) {
    let url = jsonMovies.results[orderFilm[cont]].planets[index];
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

//Atualiza as naves
async function updateShips(descriptionString) {
  let descriptionFull = "<br /><Strong>Naves: </strong><br />";
  for (let index = 0; index < jsonMovies.results[cont].starships.length; index++) {
    let url = jsonMovies.results[orderFilm[cont]].starships[index];
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

//Atualiza as espécies
async function updateSpecies(descriptionString) {
  let descriptionFull = "<br /><Strong>Espécies: </strong><br />";
  for (let index = 0; index < jsonMovies.results[cont].species.length; index++) {
    let url = jsonMovies.results[orderFilm[cont]].species[index];
    const resSpecies = await fetch(url);
    const jsonSpecies = await resSpecies.json();
    descriptionFull += jsonSpecies.name + "<br />";
  }
  p.innerHTML = "";
  buttondes.innerHTML = "Descrição completa";
  descriptionString = descriptionString + descriptionFull + "<br />" + "<br />";
  document.body.appendChild(p);

  return p.innerHTML = descriptionString;
}
// Cria os botões
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

//Função para passar para o próximo filme na ordem de lançamento.
function nextMovie() {
  if (cont != 6) {
    cont++;
    p.innerHTML = "";
    if (description) {
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

//Voltar para o filme anterior na ordem de lançamento.
function lastMovie() {
  if (cont != 0) {
    cont--;
    p.innerHTML = "";
    if (description) {
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

//Função para definir se o botão para descrição completa foi clicado.
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

//Função para abrir o menu lateral.
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

//Função para fechar o menu lateral.
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}