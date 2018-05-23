import React from 'react';

import CameraOptions from './CameraOptions';
import { Camera } from 'services';

import './style.scss';

const Stream = props =>
<div>
  <CameraOptions />
  <img id="stream" src={Camera.streamUrl} />
</div>;

export default Stream;