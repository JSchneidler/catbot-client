import axios from 'axios';

const URL = 'http://174.103.161.0:12345';

export default {
  streamUrl: URL + '/stream',
  getState: () => axios.get(URL + '/camera').then(response => response.data),
};