import axios from 'axios';

const client = axios.create({
  baseURL: 'http://api.tvmaze.com'
});

client.interceptors.response.use(response => response.data);

export default client;
