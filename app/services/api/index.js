import axios from 'axios';

import auth from './auth';

const Api = {
  get: url => auth.get(url),
  post: (url, data) => auth.post(url, data),

  login: (username, password) => auth.login(username, password),
  logout: () => auth.logout(),
};

export default Api;