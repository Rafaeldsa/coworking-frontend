import axios from 'axios';

const api = axios.create({
  baseURL: 'https://coworkingbackend.herokuapp.com/',
});

export default api;
