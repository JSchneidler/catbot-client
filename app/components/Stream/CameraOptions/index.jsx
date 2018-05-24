import React, { Component } from 'react';
import { Select, MenuItem, TextField } from '@material-ui/core';

import { camera } from 'services';

const AWB_MODES = ['off', 'auto', 'sunlight', 'cloudy', 'shade', 'tungsten', 'flourescent', 'incandescent', 'flash', 'horizon'];
const EXPOSURE_MODES = ['off', 'auto', 'night', 'nightpreview', 'backlight', 'spotlight', 'sports', 'snow', 'beach', 'verylong', 'fixedfps', 'antishake', 'fireworks'];
const IMAGE_EFFECTS = ['none', 'negative', 'solarize', 'sketch', 'denoise', 'emboss', 'oilpaint', 'hatch', 'gpen', 'pastel', 'watercolor', 'film', 'blur', 'saturation', 'colorswap', 'washedout', 'posterise', 'colorpoint', 'colorbalance', 'cartoon', 'deinterlace1', 'deinterlace2'];
const METER_MODES = ['average', 'spot', 'backlit', 'matrix'];
const RESOLUTIONS = ['1024x576', '1152x648', '1280x720', '1366x768', '1600x900', '1920x1080'];
const ROTATIONS = [0, 90, 180, 270];
const BOOLEANS = ['No', 'Yes'];

const PROPERTIES = {
  awb_mode: { options: AWB_MODES },
  exposure_mode: { options: EXPOSURE_MODES },
  image_effect: { options: IMAGE_EFFECTS },
  meter_mode: { options: METER_MODES },
  resolution: { options: RESOLUTIONS },
  rotation: { options: ROTATIONS },
  hflip: { options: BOOLEANS },
  vflip: { options: BOOLEANS },
  video_stabilization: { options: BOOLEANS },
  brightness: { range: [0, 100] },
  contrast: { range: [-100, 100] },
  exposure_compensation: { range: [-25, 25] },
  iso: { range: [0, 800] },
  saturation: { range: [-100, 100] },
  sharpness: { range: [-100, 100] },
  // TODO: zoom: { },
}

class CameraOptions extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    camera.getState().then(console.log);
  }

  getOptions() {
    const options = [];
    for (let key in PROPERTIES) {
      const property = PROPERTIES[key];

      // Enum
      if (property.options) {
        options.push(this.createSelect(key, property.options));
        continue;
      }

      // Number
      if (property.range) {
        options.push(this.createNumberInput(key, property.range));
        continue;
      }
    }

    return options;
  }

  createSelect(property, options) {
    return <Select key={property} value={0} onChange={event => this.onChange(event)}>
      {options.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}
    </Select>;
  }

  createNumberInput(property, range) {
    return <TextField key={property} label={property} onChange={event => this.onChange(event)} />
  }

  onChange(event) {
    console.log(event);
  }

  render() {
    return this.getOptions();
  }
}

export default CameraOptions;