import http from "./httpService";
import { apiEndpoint } from "../config.json";
import { getGenres } from "./genreService";

const apiUrl = apiEndpoint + "/api/movies";
export async function getMovies() {
  return await http.get(apiUrl);
}

export async function getMovie(id) {
  console.log("request url: ", apiUrl + "/" + id);
  return await http.get(apiUrl + "/" + id);
}

export async function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(apiUrl + "/" + movie._id, body);
  }
  return http.post(apiUrl, movie);
}

export function deleteMovie(id) {
  return http.delete(apiUrl + "/" + id);
}
