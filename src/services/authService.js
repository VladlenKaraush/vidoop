import http from "./httpService";
import { apiEndpoint } from "../config.json";

const apiUrl = apiEndpoint + "/api/auth";

export function login(email, password) {
  return http.post(apiUrl, { email, password });
}
