import EventEmitter from 'events';

import Api from './index';

class Auth extends EventEmitter {
  constructor() {
    super();

    this.user;
  }

  get(url) {

  }

  post(url, data) {
    
  }

  login(username, password) {
    return Api.get('/camera').then(response => response.data);
  }

  logout() {

  }
}

export default new Auth;