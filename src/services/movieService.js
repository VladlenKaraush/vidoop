import http from "./httpService";
import config from "../config.json";
import { getGenres } from "./genreService";

export async function getMovies() {
  return await http.get(config.apiEndpoint + "/api/movies");
}

export async function getMovie(id) {
  console.log("request url: ", config.apiEndpoint + "/api/movies/" + id);
  return await http.get(config.apiEndpoint + "/api/movies/" + id);
}

export async function saveMovie(movie) {
  let { data: movieInDb } = (await getMovie(movie._id)) || {};
  movieInDb.title = movie.title;
  const { data: genres } = await getGenres();
  movieInDb.genre = genres.find(g => g._id === movie.genreId);
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;
  movieInDb.liked = movie.liked;

  const movieId = movieInDb._id;
  movieInDb.genreId = movieInDb.genre._id;
  delete movieInDb.genre;
  delete movieInDb._id;

  if (!movieId) {
    return await http.post(config.apiEndpoint + "/api/movies", movieInDb);
  } else {
    return await http.put(
      config.apiEndpoint + "/api/movies/" + movieId,
      movieInDb
    );
  }
}

export async function deleteMovie(id) {
  return await http.delete(config.apiEndpoint + "/api/movies/" + id);
}
