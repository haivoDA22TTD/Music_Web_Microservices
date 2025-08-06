// src/services/authService.js
import axios from "axios";

const API = "http://localhost:8081/api/auth";

export const login = (username, password) => {
  return axios.post(`${API}/login`, { username, password });
};

export const register = (username, password) => {
  return axios.post(`${API}/register`, { username, password });
};
