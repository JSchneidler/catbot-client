import axios from 'axios';
import EventEmitter from 'events';
import path from 'path';

const API_URL = '/api';

function getJwtToken() {
  return localStorage.getItem('token');
}

function setJwtToken(token) {
  localStorage.setItem('token', token);
}

function clearJwtToken() {
  localStorage.removeItem('token');
}

class Api extends EventEmitter {
  constructor() {
    super();

    //setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTUyNzExODQzMn0.4gxfPr0mzdXHiPdrn4Ua5ajtjtPLPdZkQ_YLVb9o4Zk');
  }

  _getRequestConfig() {
    const config = {};
    const token = getJwtToken();

    if (token) config.headers = {
      Authorization: 'Bearer ' + token,
    }

    return config;
  }

  isLoggedIn() { return getJwtToken() != null; }

  _get(url) {
    return axios.get(path.join(API_URL, url), this._getRequestConfig()).then(response => response.data);
  }

  _post(url, data) {
    return axios.post(path.join(API_URL, url), data, this._getRequestConfig()).then(response => response.data);
  }

  login(username, password) {
    if (this.isLoggedIn()) return;

    return this._post('/login', { username, password })
      .then(response => setJwtToken(response.token))
      .then(() => this.emit('status', true));
  }

  logout() {
    if (!this.isLoggedIn()) return;

    return this._get('/logout')
      .then(() => clearJwtToken())
      .then(() => this.emit('status', false));
  }
}

export default new Api;