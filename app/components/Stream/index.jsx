import React from 'react';

import CameraOptions from './CameraOptions';
import { camera } from 'services';

const style = {
  display: 'block',
  width: '100%',
};

const Stream = props =>
<div>
  {/*<CameraOptions />*/}
  <img style={style} src={camera.streamUrl} />
</div>;

export default Stream;