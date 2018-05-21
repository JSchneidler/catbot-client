import React from 'react';
import { Button } from '@material-ui/core';

const TakeControls = props => <Button color="primary" variant="raised" onClick={props.onClick}>
  Take Control
</Button>;

export default TakeControls;