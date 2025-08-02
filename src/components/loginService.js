import axios from "axios";

// Use environment variable for API URL
const API_URL = `${process.env.REACT_APP_API_URL}/auth`;

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  if (response.data.token && response.data.token.token) {
    localStorage.setItem("jwt", response.data.token.token);
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