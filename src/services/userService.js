import http from "./httpService";
import { apiEndpoint } from "../config.json";

const apiUrl = apiEndpoint + "/api/users";
const apiUrlAuth = apiEndpoint + "/api/auth";

export function register(user) {
  return http.post(apiUrl, {
    email: user.email,
    password: user.password,
    name: user.username
  });
}

export function auth(user) {
  return http.post(apiUrlAuth, {
    email: user.username,
    password: user.password
  });
}
