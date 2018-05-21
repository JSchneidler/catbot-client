import React from 'react';
import { Button } from '@material-ui/core';

const ReleaseControls = props => <Button color="secondary" variant="raised" onClick={props.onClick}>
  Release Control
</Button>;

export default ReleaseControls;