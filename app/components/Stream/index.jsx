import React from 'react';

import CameraOptions from './CameraOptions';
import { camera } from 'services';

import './style.scss';

const Stream = props =>
<div>
  <CameraOptions />
  <img id="stream" src={camera.streamUrl} />
</div>;

export default Stream;