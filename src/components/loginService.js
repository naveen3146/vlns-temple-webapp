import axios from "axios";

const API_URL = "http://localhost:8085/auth";

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  // Fix: access the nested token property
  if (response.data.token && response.data.token.token) {
    localStorage.setItem("jwt", response.data.token.token); // <-- Store as string
  }
  return response.data;
};

export const register = async (username, password) => {
  const response = await axios.post(`${API_URL}/register`, { username, password });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("jwt");
};

export const getToken = () => {
  return localStorage.getItem("jwt");
};