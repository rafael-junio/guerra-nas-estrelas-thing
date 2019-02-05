const main = document.querySelector('main');

window.addEventListener('load', e => {
  updateMovies();
});

async function updateMovies() {
  const res = await fetch('https://swapi.co/api/films/');
  const json = await res.json();
  var movieDescription = '';
  p = document.createElement("p");

  for (let index = 0; index < json.results.length; index++) {

    movieDescription += movieDescription + "Título: " +json.results[index].title + "<br />"
                      + "Data de lançamento: " + json.results[index].release_date + "<br />"
                      + "Diretor: " +json.results[index].director + "<br />"
                      + "Sinopse: " + json.results[index].opening_crawl + "<br />" + "<br />";
    

  };
  p.innerHTML = movieDescription;
  return document.body.appendChild(p);
};
