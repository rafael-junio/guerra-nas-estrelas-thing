const main = document.querySelector('main');

window.addEventListener('load', e => {
  updateMovies();
});

async function updateMovies() {
  const res = await fetch('https://swapi.co/api/films/');
  const json = await res.json();
  var pos = json.results.indexOf('title');
  
  var titulo = json.results[3].title;

  p = document.createElement("p");
  p.innerHTML = titulo;
  return document.body.appendChild(p);


}
