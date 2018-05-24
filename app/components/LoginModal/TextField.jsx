import React from 'react';
import { Input, withStyles } from '@material-ui/core';

const styles = {
  underline: {
    '&:after': {
      borderBottomColor: 'green',
    },
  },
};

const TextField = props => <Input {...props} classes={{ underline: props.classes.underline }} />

export default withStyles(styles)(TextField);