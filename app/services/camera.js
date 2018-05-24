import axios from 'axios';

const URL = 'http://174.103.161.0:12345';

const camera = {
  streamUrl: URL + '/stream',
  getState: () => axios.get(URL + '/camera').then(response => response.data),
};

export default camera;