import React from 'react';
import { Button } from '@material-ui/core';

const ReleaseControl = props =>
<Button color="secondary" variant="raised" onClick={props.onClick}>
  Release Control
</Button>;

export default ReleaseControl;