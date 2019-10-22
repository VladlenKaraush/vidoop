import jwtDecode from "jwt-decode";
import http from "./httpService";
import { apiEndpoint } from "../config.json";

const apiUrl = apiEndpoint + "/api/auth";
const tokenKey = "token";

export async function login(email, password) {
  const { data: jwt } = await http.post(apiUrl, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ignore) {
    return null;
  }
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser
};
