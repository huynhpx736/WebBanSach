import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// const API_URL = "http://localhost:8080/";
export const getAuthToken = () => {
  return window.localStorage.getItem('token');
};

export const setAuthHeader = (token) => {
  if (token !== null) {
      window.localStorage.setItem("token", token);
  } else {
      window.localStorage.removeItem("token");
  }
};

const register = (username, password, email) => {
  return axios.post( "api/auth/register", {
    username,
    password,
    email
  });
};

const login = (username, password) => {
  return axios.post( "api/auth/login", {
    username,
    password
  });
};

export default {
  register,
  login
};
