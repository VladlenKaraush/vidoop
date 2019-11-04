import http from "./httpService";
import { apiEndpoint } from "../config.json";

const apiUrl = apiEndpoint + "/api/movies";

function getMovieUrl(id) {
  return `${apiUrl}/${id}`;
}
export async function getMovies() {
  return await http.get(apiUrl);
}

export async function getMovie(id) {
  return await http.get(getMovieUrl(id));
}

export async function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(getMovieUrl(movie._id), body);
  }
  return http.post(apiUrl, movie);
}

export function deleteMovie(id) {
  return http.delete(getMovieUrl(id));
}
