import React from 'react';

import CameraOptions from './CameraOptions';
import Camera from 'services/api/camera';

import './style.scss';

export default props =>
<div>
  <CameraOptions />
  <img id="stream" src={Camera.streamUrl} />
</div>;
