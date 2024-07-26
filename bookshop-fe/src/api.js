import axios from 'axios';

const API_URL = "http://localhost:8080/";

const register = (username, password, email) => {
  return axios.post(API_URL + "api/auth/register", {
    username,
    password,
    email
  });
};

const login = (username, password) => {
  return axios.post(API_URL + "api/auth/login", {
    username,
    password
  });
};

export default {
  register,
  login
};
