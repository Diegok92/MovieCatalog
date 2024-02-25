document.getElementById("search-button").addEventListener("click", searchMovie);

async function searchMovie() {
  const movieInput = document.getElementById("movie-input").value.trim();
  if (movieInput !== "") {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=API_KEY&query=${encodeURIComponent(
          movieInput
        )}`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const movie = data.results[0];
        displayMovieInfo(movie);
      } else {
        displayErrorMessage("No se encontraron resultados para esa película.");
      }
    } catch (error) {
      console.error("Error al buscar la película:", error);
      displayErrorMessage(
        "Ocurrió un error al buscar la película. Por favor, inténtalo de nuevo más tarde."
      );
    }
  } else {
    displayErrorMessage("Por favor, ingresa el nombre de una película.");
  }
}

function displayMovieInfo(movie) {
  const movieInfo = `
    <h2>${movie.title}</h2>
    <p><strong>Año de Estreno:</strong> ${movie.release_date}</p>
    <p><strong>Duración:</strong> ${movie.runtime} minutos</p>
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Poster de la película">
    <p><strong>Sinopsis:</strong> ${movie.overview}</p>
    <p><strong>Director:</strong> Pendiente</p>
    <p><strong>Actores Principales:</strong> Pendiente</p>
  `;
  document.getElementById("movie-info").innerHTML = movieInfo;
}

function displayErrorMessage(message) {
  document.getElementById("movie-info").innerHTML = `<p>${message}</p>`;
}
