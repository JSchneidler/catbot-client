import React from 'react';
import { Button } from '@material-ui/core';

export default props => <Button color="secondary" variant="raised" onClick={props.onClick}>
  Release Control
</Button>;